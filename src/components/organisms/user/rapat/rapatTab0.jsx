import { useRapatHandler } from "./rapatHandler";
import Swal from "sweetalert2";

const RapatTab0 = () => {
const {
    decide,
    isi,
    setIsi,
    user,
    rapats,
    rapatUndangan,
    loading,
    isProcessing,
    decisionResult,
    loadUserRapatDone,
    checkResult,
} = useRapatHandler();

const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan menyetujui rapat ini.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, setujui!",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        await decide(id, "approved");
        Swal.fire("Berhasil", "Rapat telah disetujui.", "success");
      } catch (error) {
        Swal.fire("Gagal", error.message || "Terjadi kesalahan saat menyetujui rapat.", "error");
      }
    }
  };

  // ❌ Handler Reject
  const handleReject = async (id) => {
    const { value: catatan, isConfirmed } = await Swal.fire({
      title: "Tolak Rapat",
      input: "textarea",
      inputLabel: "Catatan Penolakan (opsional)",
      inputPlaceholder: "Tulis alasan penolakan di sini...",
      showCancelButton: true,
      confirmButtonText: "Tolak Rapat",
      cancelButtonText: "Batal",
    });

    if (isConfirmed) {
      try {
        // setRapatId(id);
        await decide(id, "rejected", catatan || "");
        Swal.fire("Ditolak", "Rapat berhasil ditolak.", "success");
      } catch (error) {
        Swal.fire("Gagal", error.message || "Terjadi kesalahan saat menolak rapat.", "error");
      }
    }
  };


return(
<div>
    <h1 className="text-2xl font-semibold mb-6 text-gray-800">Undangan Rapat Masuk</h1>
    <ul className="space-y-4">
        {rapatUndangan.filter((r) => r.status !== "selesai").length === 0 ? (
            <p className="text-gray-500">Tidak ada undangan rapat untuk saat ini.</p>
        ) : (
            rapatUndangan
            .filter((r) => r.status !== "selesai")
            .map((rapat) => (
            <li
                key={rapat.id}
                className="p-5 border border-gray-200 rounded-xl shadow-sm bg-white transition hover:shadow-md"
            >
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-blue-600">{rapat.judul}</h2>
                    <span className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                        {rapat.urgensi?.toUpperCase()}
                    </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                {rapat.agenda && <p><strong>Agenda:</strong> {rapat.agenda}</p>}
                {rapat.lokasi && <p><strong>Lokasi:</strong> {rapat.lokasi}</p>}
                {rapat.lokasi && <p><strong>Lokasi:</strong> {rapat.status}</p>}
                {rapat.jam && <p><strong>Jam:</strong> {rapat.jam}</p>}
                <p><strong>Tanggal:</strong>{" "}
                    {new Date(rapat.tanggal_terpilih).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    })}
                </p>
                </div>

                {rapat.lampiran && (
                <div className="mt-2 text-sm">
                    <span className="font-medium">Lampiran:</span>{" "}
                    <span className="text-blue-600">{rapat.lampiran}</span>
                </div>
                )}
                {/* Tombol Approve dan Reject jika user jabatan ketua */}
                {user?.jabatan?.toLowerCase() === "ketua" && rapat?.status === "menunggu_approval_ketua" && (
                <div className="mt-4 flex gap-2">
                    <button
                    onClick={() => handleApprove(rapat.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm"
                    disabled={isProcessing}
                    >
                    {isProcessing ? "Memproses..." : "Setujui"}
                    </button>
                    <button
                    onClick={() => handleReject(rapat.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
                    disabled={isProcessing}
                    >
                    {isProcessing ? "Memproses..." : "Tolak"}
                    </button>
                </div>
                )}
            </li>
            ))
        )}
    </ul>
</div>
);
};

export default RapatTab0;