import { getBerita, postBerita, putBerita, deleteBerita } from "./ServiceBerita";

export const fetchBerita = async () => {
  try {
    const response = await getBerita();
    if (Array.isArray(response)) {
      return { success: true, data: response };
    } else {
      return { success: false, message: "Data berita tidak valid" };
    }
  } catch (error) {
    console.error("Error fetchBerita:", error);
    return { success: false, message: "Gagal mengambil data berita" };
  }
};

export const createBerita = async (data) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title || "");   // ⬅️ ubah ke "title"
    formData.append("caption", data.caption || "");
    if (data.image) {                             // ⬅️ ubah ke "image"
      formData.append("image", data.image);
    }

    const response = await postBerita(formData);

    return {
      success: response.success === true,
      data: response.data, // backend return 'data', bukan 'berita'
      message: response.message,
    };
  } catch (error) {
    console.error("Error createBerita:", error);
    return { success: false, message: "Gagal menambahkan berita" };
  }
};

export const editBerita = async (id, data) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title || "");     // ✅ pakai "title"
    formData.append("caption", data.caption || ""); // ✅ sesuai backend
    if (data.image) {
      formData.append("image", data.image);         // ✅ sesuai backend
    }

    const response = await putBerita(id, formData);

    return {
      success: response.success === true,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    console.error("Error editBerita:", error);
    return { success: false, message: "Gagal mengupdate berita" };
  }
};


export const removeBerita = async (id) => {
  try {
    const response = await deleteBerita(id);
    return {
      success: response.success === true,
      message: response.message,
    };
  } catch (error) {
    console.error("Error removeBerita:", error);
    return { success: false, message: "Gagal menghapus berita" };
  }
};
