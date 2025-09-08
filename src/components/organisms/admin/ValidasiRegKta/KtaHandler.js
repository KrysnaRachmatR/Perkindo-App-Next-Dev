import { approveKTA, rejectKTA, downloadKTA } from "./KtaService";

export const handleApprove = async (id, confirm, fetchKTAs, setToast) => {
  const no_kta = prompt("Masukkan Nomor KTA (Bebas diisi):");
  const confirmed = await confirm("confirm", "Apakah Anda yakin ingin menerima pendaftaran ini?");
  if (confirmed) {
    try {
      await approveKTA(id, no_kta);
      setToast({ message: "Pendaftaran berhasil diterima.", type: "success" });
      fetchKTAs();
    } catch {
      setToast({ message: "Gagal menerima pendaftaran.", type: "error" });
    }
  }
};

export const handleReject = async (id, confirm, fetchKTAs, setToast) => {
  const komentar = prompt("Masukkan komentar untuk penolakan (opsional):");
  const confirmed = await confirm("delete", "Apakah Anda yakin ingin menolak pendaftaran ini?");
  if (confirmed) {
    try {
      await rejectKTA(id, komentar);
      setToast({ message: "Pendaftaran berhasil ditolak.", type: "success" });
      fetchKTAs();
    } catch {
      setToast({ message: "Gagal menolak pendaftaran.", type: "error" });
    }
  }
};

export const handleDownload = async (userId, setToast) => {
  try {
    const response = await downloadKTA(userId);

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    const contentDisposition = response.headers["content-disposition"];
    const filename = contentDisposition
      ? decodeURIComponent(contentDisposition.split("filename=")[1]?.replace(/"/g, ""))
      : `KTA_${userId}.zip`;

    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToast({ message: "File berhasil diunduh!", type: "success" });
  } catch (err) {
    console.error("Gagal mengunduh file:", err);
    setToast({ message: "Gagal mengunduh file", type: "error" });
  }
};
