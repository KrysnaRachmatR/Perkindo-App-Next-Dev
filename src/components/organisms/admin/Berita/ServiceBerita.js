import api from "@/services/api";

// Ambil semua berita
export const getBerita = async () => {
  try {
    const response = await api.get("/berita", {
      headers: { "ngrok-skip-browser-warning": true },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching berita:", error);
    return { success: false, message: "Gagal mengambil data berita" };
  }
};

// Tambah berita
export const postBerita = async (data) => {
  try {
    const response = await api.post("/berita", data, {
      headers: { "ngrok-skip-browser-warning": true },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting berita:", error);
    return { success: false, message: "Gagal menambahkan berita" };
  }
};

// Update berita
export const putBerita = async (id, data) => {
  try {
    const response = await api.post(`/berita/${id}`, data, {
      headers: { "ngrok-skip-browser-warning": true },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating berita:", error);
    return { success: false, message: "Gagal mengupdate berita" };
  }
};

// Hapus berita
export const deleteBerita = async (id) => {
  try {
    const response = await api.delete(`/berita/${id}`, {
      headers: { "ngrok-skip-browser-warning": true },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting berita:", error);
    return { success: false, message: "Gagal menghapus berita" };
  }
};
