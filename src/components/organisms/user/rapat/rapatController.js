import { getRapat, 
  getNotulen, 
  createNotulensi, 
  getRapatDone, 
  putNotulen, 
  decideRapat, 
  checkHadirRapat, 
  postPollingTanggal,
  getAllNotulensi,
  postTtdAbsen,
  getUserRapatDone,
  downloadNotulensiZip } from "./RapatService";

import Swal from "sweetalert2";

export const fetchUndanganController = async () => {
  const res = await getRapat();
  if (!res.success) {
    Swal.fire("Gagal!", res.message || "Gagal mengambil undangan", "error");
    throw new Error(res.message || "Gagal mengambil undangan");
  }
  return res.data;
};

export const FetchNotulensi = async (rapatId) => {
  try {
    const result = await getNotulen(rapatId); // service/API call
    return {
      success: true,
      data: result.notulensi,
      message: result.message
    };
  } catch (error) {
    Swal.fire("Error", error.message || "Notulensi Belum Tersedia.", "error");
    return {
      success: false,
      message: error.message
    };
  }
};

export const fetchAllNotulensi = async () => {
  const res = await getAllNotulensi();
  if (!res.success) {
    Swal.fire("Gagal!", res.message || "Gagal mengambil undangan", "error");
    throw new Error(res.message || "Gagal mengambil undangan");
  }
  return res.data;
};

export const fetchCreateNotulensi = async (rapatId, data) => {
  const formData = new FormData();
  formData.append("isi", data.isi);

  if (data.files && data.files.length > 0) {
    data.files.forEach((file) => {
      formData.append("files[]", file);
    });
  }

  try {
    const result = await createNotulensi(rapatId, formData);
    Swal.fire("Berhasil", result.message || "Notulensi berhasil dibuat", "success");
    return { success: true, message: result.message, data: result.notulensi };
  } catch (error) {
    Swal.fire("Gagal", error.message || "Gagal membuat notulensi", "error");
    return { success: false, message: error.message };
  }
};

export const fetchRapatDone = async () => {
  try {
    const response = await getRapatDone();

    if (response.success && Array.isArray(response.data)) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      Swal.fire("Error", "Data rapat tidak valid", "error");
      return {
        success: false,
        message: "Data rapat tidak valid",
      };
    }
  } catch (error) {
    console.error("Error fetching rapat:", error);
    Swal.fire("Gagal", "Gagal mengambil data rapat", "error");
    return {
      success: false,
      message: "Gagal mengambil data rapat",
    };
  }
};

export const fetchUpdateNotulensi = async (notulensiId, formData) => {
  const response = await putNotulen(notulensiId, formData); // pastikan ini request ke API-mu
  return response;
};

export const fetchDecideRapat = async (rapatId, status, catatan = "") => {
  try {
    const response = await decideRapat(rapatId, status, catatan);
    if (response.success) {
      const statusText = status === "approved" ? "disetujui" : "ditolak";
      Swal.fire("Berhasil", `Rapat berhasil ${statusText}.`, "success");
      return { success: true, message: response.message };
    } else {
      Swal.fire("Gagal", response.message || "Gagal memproses keputusan", "error");
      return { success: false, message: response.message };
    }
  } catch (error) {
    Swal.fire("Gagal", error.message || "Terjadi kesalahan", "error");
    return { success: false, message: error.message };
  }
};

export const fetchCheckHadirRapat = async (rapatId, status, alasan = "") => {
  try {
    const response = await checkHadirRapat(rapatId, status, alasan);
    if (response.success) {
      const statusText = status === "hadir" ? "disetujui" : "tidak_hadir";
      Swal.fire("Berhasil", `Rapat berhasil ${statusText}.`, "success");
      return { success: true, message: response.message };
    } else {
      Swal.fire("Gagal", response.message || "Gagal memproses keputusan", "error");
      return { success: false, message: response.message };
    }
  } catch (error) {
    Swal.fire("Gagal", error.message || "Terjadi kesalahan", "error");
    return { success: false, message: error.message };
  }
};

export const fetchPostPollingTanggal = async (rapatId, tanggal) => {
  try {
    const response = await postPollingTanggal(rapatId, tanggal);

    return {
      success: true,
      message: response.message,
      polling: response.polling,
      tanggalTerpilih: response.tanggal_terpilih,
    };
  } catch (error) {
    console.error("Error posting polling tanggal:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Gagal mengirim polling tanggal",
    };
  }
};

export const fetchUserRapatDone = async () => {
  try {
    const response = await getUserRapatDone();

    if (response.success && Array.isArray(response.data)) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      Swal.fire("Error", "Data rapat tidak valid", "error");
      return {
        success: false,
        message: "Data rapat tidak valid",
      };
    }
  } catch (error) {
    console.error("Error fetching user rapat done:", error);
    Swal.fire("Gagal", "Gagal mengambil data rapat", "error");
    return {
      success: false,
      message: "Gagal mengambil data rapat",
    };
  }
};

export const kirimAbsensiRapat = async (rapatId, ttdBlob = null) => {
  try {
    const result = await postTtdAbsen(rapatId, ttdBlob);

    return {
      success: true,
      message: result.message || "Absensi berhasil dikirim",
      data: result.data || null,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Gagal mengirim absensi",
    };
  }
};

export const handleDownloadNotulensi = async (rapatId) => {
  try {
    const response = await downloadNotulensiZip(rapatId);

    // Buat URL blob dan download otomatis
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `notulensi_rapat_${rapatId}.zip`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error("Gagal download notulensi:", error);
    throw error;
  }
};
