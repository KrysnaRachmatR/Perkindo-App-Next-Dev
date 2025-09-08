import { getGaleri, postGaleri, putGaleri, deleteGaleri } from "./ServiceGaleri";

export const fetchGaleri = async () => {
  try {
    const response = await getGaleri();

    if (response.success && Array.isArray(response.data)) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: "Data galeri tidak valid" };
    }
  } catch (error) {
    console.error("Error fetchGaleri:", error);
    return { success: false, message: "Gagal mengambil data galeri" };
  }
};


export const createGaleri = async (data) => {
  try {
    const formData = new FormData();
    formData.append("judul", data.judul || "");   // ⬅️ ubah ke "title"
    formData.append("caption", data.caption || "");
    if (data.image) {
      formData.append("gambar", data.image);
    }

    const response = await postGaleri(formData);

    return {
      success: response.success === true,
      data: response.data, // backend return 'data', bukan 'galeri'
      message: response.message,
    };
  } catch (error) {
    console.error("Error createGaleri:", error);
    return { success: false, message: "Gagal menambahkan galeri" };
  }
};

export const editGaleri = async (id, data) => {
  try {
    const formData = new FormData();
    formData.append("judul", data.judul || "");     // ✅ pakai "title"
    formData.append("caption", data.caption || ""); // ✅ sesuai backend
    if (data.image) {
      formData.append("gambar", data.image);         // ✅ sesuai backend
    }

    const response = await putGaleri(id, formData);

    return {
      success: response.success === true,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    console.error("Error editGaleri:", error);
    return { success: false, message: "Gagal mengupdate galeri" };
  }
};


export const removeGaleri = async (id) => {
  try {
    const response = await deleteGaleri(id);
    return {
      success: response.success === true,
      message: response.message,
    };
  } catch (error) {
    console.error("Error removeGaleri:", error);
    return { success: false, message: "Gagal menghapus galeri" };
  }
};
