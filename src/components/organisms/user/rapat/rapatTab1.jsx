import { useRapatHandler } from "./rapatHandler";
import { useState } from "react";
import Swal from "sweetalert2";

const RapatTab1 = () => {
    const [selectedDates, setSelectedDates] = useState([]);
    const [rapatId, setRapatId] = useState([]);


const {
    rapatDone,
    check,
    postPolling,
} = useRapatHandler();

    const handleHadir = async (id) => {
    const confirm = await Swal.fire({
      title: "Konfirmasi Kehadiran",
      text: "Apakah Anda akan hadir di rapat ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, saya akan hadir",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        Swal.showLoading();
        await check(id, "hadir");

        Swal.fire("Berhasil", "Kehadiran Anda telah dikonfirmasi.", "success");

        // 🔁 Refresh opsional
        if (typeof refreshData === "function") {
          await refreshData();
        }
      } catch (error) {
        console.error("Gagal submit kehadiran:", error);
        Swal.fire("Gagal", error?.message || "Terjadi kesalahan saat mengonfirmasi kehadiran.", "error");
      }
    }
    };

    const handleTidakHadir = async (id) => {
  const { value: alasan, isConfirmed } = await Swal.fire({
    title: "Konfirmasi Ketidakhadiran",
    text: "Silakan berikan alasan Anda tidak dapat hadir:",
    input: "textarea",
    inputPlaceholder: "Contoh: Ada kegiatan lain, sedang sakit, dll...",
    inputValidator: (value) => {
      if (!value || value.trim() === "") {
        return "Alasan tidak boleh kosong!";
      }
    },
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Kirim",
    cancelButtonText: "Batal",
  });

  if (isConfirmed && alasan.trim() !== "") {
    try {
      Swal.showLoading();

      // Pastikan fungsi `check` menerima alasan sebagai argumen ketiga
      await check(id, "tidak_hadir", alasan.trim());

      Swal.fire("Berhasil", "Ketidakhadiran Anda telah dikonfirmasi.", "success");

      if (typeof refreshData === "function") {
        await refreshData();
      }
    } catch (error) {
      Swal.fire(
        "Gagal",
        error.message || "Terjadi kesalahan saat mengonfirmasi ketidakhadiran.",
        "error"
      );
    }
  }
    };

    const handleCheckboxTgl = (tanggal) => {
    setSelectedDates([tanggal]); // hanya 1 tanggal yang dipilih
    };

    const handleSubmitPolling = async (rapatId) => {
    if (selectedDates.length !== 1) {
      await Swal.fire({
        title: "Peringatan",
        text: "Pilih tepat satu tanggal untuk polling.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const tanggalYangDipilih = new Date(selectedDates[0])
      .toISOString()
      .split("T")[0]; // Format: YYYY-MM-DD

    // Konfirmasi sebelum kirim polling
    const konfirmasi = await Swal.fire({
      title: "Konfirmasi Pilihan",
      text: `Apakah Anda yakin memilih tanggal ${tanggalYangDipilih}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
    });

    if (!konfirmasi.isConfirmed) return;

    try {
      const result = await postPolling(rapatId, tanggalYangDipilih);

      if (result.success) {
        // Update state untuk menandai user sudah memilih
        setRapatId((prev) =>
          prev.map((r) =>
            r.id === rapatId ? { ...r, user_sudah_memilih: true } : r
          )
        );
        setSelectedDates([]);

        await Swal.fire({
          title: "Berhasil!",
          text: "Polling tanggal berhasil disimpan.",
          icon: "success", // ✅ ini yang memunculkan ikon centang
          confirmButtonText: "OK",
        });
      } else {
        await Swal.fire({
          title: "Gagal",
          text: result.message || "Polling gagal dikirim.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error saat submit polling:", error);
      await Swal.fire({
        title: "Gagal",
        text: error.message || "Terjadi kesalahan saat polling.",
        icon: "error",
        confirmButtonText: "OK",
      });
      loadingRapat = false;
    }
    };


return(
    <div>
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Finalisasi Rapat</h1>
        <ul className="space-y-4">
          {rapatDone.length == 0 ? (
            <p className="text-gray-500">Belum ada rapat yang Finalisasi.</p>
          ) : (
            rapatDone.map((r) => (
              <li key={r.id} className="border border-gray-200 rounded-lg p-4 shadow-md bg-white space-y-3">
                {/* Judul & Nomor Surat */}
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-600">{r.judul}</h2>
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

                {/* Info Detail */}
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Agenda:</strong> {r.agenda}</p>
                  <p><strong>Hal:</strong> {r.hal}</p>
                  <p><strong>Lokasi:</strong> {r.lokasi}</p>
                  <p><strong>Jam:</strong> {r.jam}</p>
                  <p><strong>Tanggal:</strong>{" "}
                    {new Date(r.tanggal_terpilih).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {r.lampiran && <p><strong>Lampiran:</strong> {r.lampiran}</p>}
                </div>

                {/* Topik Rapat */}
                {Array.isArray(r.topik) && r.topik.length > 0 && (
                  <div className="text-sm text-gray-700">
                    <strong>Topik:</strong>
                    <ul className="list-disc list-inside ml-2">
                      {r.topik.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tombol Notulensi */}
                {/* <button
                  onClick={() => handleToggleNotulen(r.id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {loadingNotulenMap[r.id]
                    ? "Memuat..."
                    : openNotulenId === r.id
                    ? "Tutup Notulensi"
                    : "Lihat Notulensi"}
                </button> */}

                {/* Button Hadir / Tidak Hadir */}
                {!r.user_sudah_menjawab_kesediaan_hadir && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleHadir(r.id, "hadir")}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Hadir
                    </button>
                    <button
                      onClick={() => handleTidakHadir(r.id, "tidak_hadir")}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Tidak Hadir
                    </button>
                  </div>
                )}

                {/* Polling Tanggal */}
                {r.status === "menunggu_polling_tanggal" &&
                  Array.isArray(r.opsi_tanggal_polling) &&
                  r.opsi_tanggal_polling.length > 0 && (
                    <>
                      {!r.user_sudah_memilih_polling_tanggal ? (
                        // 🔵 Jika user belum memilih → tampilkan form polling
                        <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
                          <h2 className="text-lg font-semibold mb-4">Pilih Tanggal Rapat</h2>

                          <div className="space-y-2">
                            {r.opsi_tanggal_polling.map((item) => (
                              <label
                                key={item.id}
                                className="flex items-center gap-2 p-2 border rounded-md cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  value={item.tanggal}
                                  checked={selectedDates.includes(item.tanggal)}
                                  onChange={() => handleCheckboxTgl(item.tanggal)}
                                />
                                <span>
                                  {new Date(item.tanggal).toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </label>
                            ))}
                          </div>

                          <button
                            onClick={() => handleSubmitPolling(r.id)}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                          >
                            Kirim Pilihan
                          </button>
                        </div>
                      ) : (
                        // ✅ Jika user sudah memilih → tampilkan info hasil pilihan
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
                          <h2 className="text-md font-semibold mb-2">Tanggal yang Anda Pilih:</h2>
                          <ul className="list-disc ml-5 mb-3 text-sm text-gray-800 dark:text-gray-100">
                            {r.tanggal_yang_dipilih?.map((tgl) => (
                              <li key={tgl}>
                                {new Date(tgl).toLocaleDateString("id-ID", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </li>
                            ))}
                          </ul>

                          {r.tanggal_terpilih && (
                            <p className="text-sm text-green-600 dark:text-green-400">
                              📅 Tanggal rapat yang terpilih:{" "}
                              <strong>
                                {new Date(r.tanggal_terpilih).toLocaleDateString("id-ID", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </strong>
                            </p>
                          )}
                        </div>
                      )}
                    </>
                )}
                {/* Isi Notulensi */}
                {/* {openNotulenId === r.id && notulenMap[r.id] && ( */}
                  
                {/* )} */}
              </li>
            ))
          )}
        </ul>
      </div>
);
};

export default RapatTab1;