import { useRapatHandler } from "./RapatHandler";
import { getNotulen } from "./RapatService";
import { kirimAbsensiRapat } from "./RapatController";
// import { handleDownloadNotulensiZip } from "@/controllers/notulensiController";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
import SignatureCanvas from "react-signature-canvas";
import { BASE_URL } from "@/utils/constant";

const RapatTab3 = () => {
  const sigRefs = useRef({});
  const [openNotulenId, setOpenNotulenId] = useState(null);
  const [notulenMap, setNotulenMap] = useState({});
  const [loadingNotulenMap, setLoadingNotulenMap] = useState({});

  const {
    userRapatDone,
    loading,
    setErrorMsg,
    setLoading,
    setSuccessMsg,
    errorMsg,
    successMsg,
    loadingDownload,
    errorDownload,
    downloadNotulensi,
  } = useRapatHandler();

  const submitAbsensi = async (rapatId) => {
    const sigRef = sigRefs.current[rapatId];
    if (!sigRef?.isEmpty()) {
      sigRef.getCanvas().toBlob(async (blob) => {
        if (!blob) {
          setErrorMsg("Gagal menghasilkan tanda tangan.");
          return;
        }

        try {
          setLoading(true);
          const response = await kirimAbsensiRapat(rapatId, blob);
          if (response.success) {
            setSuccessMsg(response.message);
          } else {
            setErrorMsg(response.message || "Gagal menyimpan absensi.");
          }
        } catch (err) {
          console.error(err);
          setErrorMsg("Terjadi kesalahan saat mengirim absensi.");
        } finally {
          setLoading(false);
        }
      }, "image/png");
    } else {
      setErrorMsg("Silakan tanda tangani terlebih dahulu.");
    }
  };

  const handleToggleNotulen = async (rapatId) => {
    const isOpen = openNotulenId === rapatId;
    if (isOpen) {
      setOpenNotulenId(null);
      return;
    }

    if (!notulenMap[rapatId]) {
      setLoadingNotulenMap((prev) => ({ ...prev, [rapatId]: true }));

      try {
        const res = await getNotulen(rapatId);
        if (res.success) {
          if (!res.notulensi) {
            Swal.fire("Tidak Ada Notulensi", "Belum ada notulensi untuk rapat ini.", "info");
            return;
          }
          setNotulenMap((prev) => ({
            ...prev,
            [rapatId]: res.notulensi,
          }));
        } else {
          Swal.fire("Gagal", res.message || "Gagal mengambil notulensi.", "error");
          return;
        }
      } catch (err) {
        console.error("Gagal mengambil notulensi:", err);
        Swal.fire("Error", "Terjadi kesalahan saat mengambil notulensi.", "error");
        return;
      } finally {
        setLoadingNotulenMap((prev) => ({ ...prev, [rapatId]: false }));
      }
    }

    setOpenNotulenId(rapatId);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Rapat yang Telah Selesai</h1>

      {userRapatDone.map((r) => {
        const isNotulensiOpen = openNotulenId === r.id;
        const notulensi = notulenMap[r.id];
        const loadingNotulensi = loadingNotulenMap[r.id];

        return (
          <div
            key={r.id}
            className="border border-gray-200 rounded-xl p-5 bg-white shadow space-y-3"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold text-blue-700">{r.judul}</h2>
                {r.nomor && (
                  <p className="text-sm text-gray-500">
                    Nomor: <span className="font-medium">{r.nomor}</span>
                  </p>
                )}
              </div>
              {r.file_undangan_pdf && (
                <a
                  href={`${BASE_URL}/storage/${r.file_undangan_pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 underline"
                >
                  Lihat Undangan
                </a>
              )}
            </div>

            {/* Info Rapat */}
            <div className="text-sm text-gray-600 space-y-1">
              {r.agenda && <p><strong>Agenda:</strong> {r.agenda}</p>}
              {r.hal && <p><strong>Hal:</strong> {r.hal}</p>}
              {r.lokasi && <p><strong>Lokasi:</strong> {r.lokasi}</p>}
              {r.jam && <p><strong>Jam:</strong> {r.jam}</p>}
              {r.tanggal_terpilih && (
                <p>
                  <strong>Tanggal:</strong>{" "}
                  {new Date(r.tanggal_terpilih).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
              {r.lampiran && <p><strong>Lampiran:</strong> {r.lampiran}</p>}
            </div>

            {/* Creator */}
            <p className="text-xs text-gray-500">
              Dibuat oleh: {r.creator?.name} ({r.creator?.username})
            </p>

            {/* Tombol Toggle Notulensi */}
            <button
              onClick={() => handleToggleNotulen(r.id)}
              className="text-sm text-blue-600 underline"
            >
              {isNotulensiOpen ? "Tutup Notulensi" : "Lihat Notulensi"}
            </button>

            {/* Notulensi */}
            {isNotulensiOpen && notulensi && (
              <div className="mt-3 text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded-md border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-blue-600">Notulensi:</h3>
                  <button
                    onClick={() => downloadNotulensi(r.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                  >
                    Download ZIP
                  </button>
                </div>
                <div dangerouslySetInnerHTML={{ __html: notulensi.isi }} />
              </div>
            )}

            {/* Absensi */}
            {r.status === "selesai" && !r.sudah_absen && (
              <div>
                <h2 className="mt-4 font-semibold">Absensi Rapat</h2>
                <SignatureCanvas
                  ref={(ref) => (sigRefs.current[r.id] = ref)}
                  penColor="black"
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: "border border-gray-300",
                  }}
                />
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => submitAbsensi(r.id)}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    {loading ? "Menyimpan..." : "Simpan Absensi"}
                  </button>
                  <button
                    onClick={() => sigRefs.current[r.id]?.clear()}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Hapus Tanda Tangan
                  </button>
                </div>
                {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                {successMsg && <p className="text-green-500">{successMsg}</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RapatTab3;
