import api from "@/services/api";

// Ambil semua berita
export const getGaleri = async () => {
  try {
    const response = await api.get("/galeri", {
      headers: { "ngrok-skip-browser-warning": true },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching berita:", error);
    return { success: false, message: "Gagal mengambil data berita" };
  }
};

// Tambah berita
export const postGaleri = async (data) => {
  try {
    const response = await api.post("/galeri", data, {
      headers: { "ngrok-skip-browser-warning": true },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting berita:", error);
    return { success: false, message: "Gagal menambahkan berita" };
  }
};

// Update berita
export const putGaleri = async (id, data) => {
  try {
    const response = await api.post(`/galeri/${id}`, data, {
      headers: { "ngrok-skip-browser-warning": true },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating galeri:", error);
    return { success: false, message: "Gagal mengupdate galeri" };
  }
};

// Hapus galeri
export const deleteGaleri = async (id) => {
  try {
    const response = await api.delete(`/galeri/${id}`, {
      headers: { "ngrok-skip-browser-warning": true },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting galeri:", error);
    return { success: false, message: "Gagal menghapus galeri" };
  }
};
