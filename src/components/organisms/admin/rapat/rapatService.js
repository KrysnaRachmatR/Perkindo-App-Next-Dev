import api from "@/services/api";
// import { headers } from "next/headers";z

export const getRapat = async () => {
    try {
        const response  = await api.get('/admin/rapat',{headers:{
          'ngrok-skip-browser-warning' : true
        }});
        return  response.data;
    }catch (error){
        console.error("error fecthing rapat:", error);
        return {success: false, message: "Gagal mengambil data rapat"};
    }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/admin/anggota', {headers:{
      'ngrok-skip-browser-warning' : true
    }});
    return response.data;
  } catch (error) {
    console.error("Gagal fetch user:", error);
    return { success: false, data: [] };
  }
};

export const postRapat = async (data) => {
    try {
        const response = await api.post('/admin/rapat', data);
        return response.data;
    } catch (error) {
        console.error("error posting rapat:", error);
        return {success: false, message: "Gagal menambahkan rapat"};
    }
};

export const updateRapat = async (id, data) => {
  try {
    data.append("_method", "PUT");

    const response = await api.post(`/admin/rapat/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Pastikan format responsenya aman
    return {
      success: response.data?.success ?? true, // fallback ke true kalau tidak ada
      data: response.data?.rapat ?? null,
      message: response.data?.message ?? "Rapat berhasil diperbarui.",
    };
  } catch (error) {
    console.error("error updating rapat:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message || "Gagal memperbarui rapat.",
    };
  }
};

export const removeRapat = async (id) => {
  try {
    const response = await api.delete(`/admin/rapat/${id}`);

    // Ambil success dan message dari response.data
    return {
      success: response.data.success === true,
      message: response.data.message || "Rapat berhasil dihapus.",
    };
  } catch (error) {
    console.error("Error saat menghapus rapat:", error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Terjadi kesalahan saat menghapus rapat.",
    };
  }
};

export const getRapatMenungguPolling = async () => {
  try {
    const response = await api.get("/admin/rapat/pol-polan", {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal fetch rapat menunggu polling:", error);
    return { success: false, data: [] };
  }
};

export const postOptionTanggal = async (rapatId, opsiTanggal = []) => {
  try {
    const response = await api.post(
      `/admin/rapat/${rapatId}/optiontanggal`,
      { opsi_tanggal: opsiTanggal }, // Body request
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Gagal Post Option Tanggal", error);
    return {
      success: false,
      error: error.response?.data?.message || "Terjadi kesalahan",
    };
  }
};

export const postNotulen = async (rapatId, formData) => {
  try {
    const response = await api.post(
      `admin/rapat/${rapatId}/create-notulensi`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating notulensi:", error);
    throw error?.response?.data || { message: "Gagal memperbarui notulensi" };
  }
};
