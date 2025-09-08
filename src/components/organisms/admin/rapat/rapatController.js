import { getUsers, 
        postRapat,
        updateRapat,
        removeRapat,
        getRapat,
        getRapatMenungguPolling, 
        postOptionTanggal,
        postNotulen,
} from "./RapatService";   

export const fetchRapat = async () => {
  try {
    const response = await getRapat();

    // Validasi response
    if (response.success && Array.isArray(response.data)) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "Data rapat tidak valid",
      };
    }
  } catch (error) {
    console.error("Error fetching rapat:", error);
    return {
      success: false,
      message: "Gagal mengambil data rapat",
    };
  }
};

export const createRapat = async (data) => {
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const formData = new FormData();

  formData.append("judul", data.judul);
  formData.append("agenda", data.agenda || "");
  formData.append("lokasi", data.lokasi || "");
  formData.append("urgensi", data.urgensi || "");
  formData.append("tanggal_terpilih", formatDate(data.tanggal_terpilih));
  formData.append("jam", data.jam || "");
  formData.append("nomor", data.nomor || "");
  formData.append("lampiran", data.lampiran || "");
  formData.append("hal", data.hal || "");

  if (data.header_image) {
    formData.append("header_image", data.header_image);
  }

  if (data.tanda_tangan_image) {
    formData.append("tanda_tangan_image", data.tanda_tangan_image);
  }

  data.peserta.forEach((p, i) => {
    formData.append(`peserta[${i}][user_id]`, p.user_id);
  });

  if (Array.isArray(data.topik)) {
    data.topik.forEach((t, i) => {
      formData.append(`topik[${i}]`, t);
    });
  }

  try {
    const response = await postRapat(formData);
    return {
      success: response.success === true,
      data: response.rapat,
      message: response.message,
      download_url: response.download_url,
    };
  } catch (error) {
    console.error("Error creating rapat:", error);
    return {
      success: false,
      message: "Gagal menambahkan rapat",
    };
  }
};

export const fetchUsers = async () => {
  try {
    const response = await getUsers();
    if (response.success && Array.isArray(response.data)) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "Data user tidak valid",
      };
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      message: "Gagal mengambil data user",
    };
  }
}

export const editRapat = async (id, data) => {
  const formData = new FormData();

  // Spoof method PUT (untuk Laravel)
  formData.append("_method", "PUT");

  // Field dasar
  formData.append("judul", data.judul ?? "");
  formData.append("agenda", data.agenda ?? "");
  formData.append("lokasi", data.lokasi ?? "");
  formData.append("urgensi", data.urgensi ?? "");
  formData.append("tanggal_terpilih", data.tanggal_terpilih ?? "");
  formData.append("jam", data.jam ?? "");
  formData.append("nomor", data.nomor ?? "");
  formData.append("lampiran", data.lampiran ?? "");
  formData.append("hal", data.hal ?? "");

  // Upload file: header_image
  if (data.header_image instanceof File) {
    formData.append("header_image", data.header_image);
  }

  // Upload file: tanda_tangan_image
  if (data.tanda_tangan_image instanceof File) {
    formData.append("tanda_tangan_image", data.tanda_tangan_image);
  }

  // Peserta[] → peserta[0][user_id]
  if (Array.isArray(data.peserta)) {
    data.peserta.forEach((peserta, index) => {
      if (peserta?.user_id) {
        formData.append(`peserta[${index}][user_id]`, peserta.user_id);
      }
    });
  }

  // Topik[] → topik[0], topik[1], ...
  if (Array.isArray(data.topik)) {
    data.topik.forEach((topik, index) => {
      formData.append(`topik[${index}]`, topik ?? "");
    });
  }

  try {
    const response = await updateRapat(id, formData);
    return {
      success: response.success,
      data: response.data,
      message: response.message || "Rapat berhasil diperbarui.",
    };
  } catch (error) {
    console.error("Error updating rapat:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message || "Terjadi kesalahan saat update rapat.",
    };
  }
};

export const deleteRapat = async (id) => {
  try {
    const response = await removeRapat(id);
    return {
      success: response.success,
      message: response.message,
    };
  } catch (error) {
    console.error("Error deleting rapat:", error);
    return {
      success: false,
      message: "Gagal menghapus rapat",
    };
  }
}

export const fetchRapatMenungguPolling = async () => {
  try {
    const response = await getRapatMenungguPolling();
    if (response.success && Array.isArray(response.data)) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "Data tidak valid.",
      };
    }
  } catch (error) {
    console.error("Error controller fetch:", error);
    return {
      success: false,
      message: "Gagal mengambil data polling rapat.",
    };
  }
};

export const createOptionTanggal = async (rapatId, opsiTanggal) => {
  try {
    const response = await postOptionTanggal(rapatId, opsiTanggal);
    return {
      success: true,
      data: response.data,
      message: "Opsi tanggal berhasil dibuat.",
    };
  } catch (error) {
    console.error("Error creating opsi tanggal:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Gagal membuat opsi tanggal untuk rapat.",
    };
  }
}

export const fetchCreateNotulensi = async (rapatId, data) => {
  const formData = new FormData();
  formData.append("isi", data.isi);

  if (data.files && data.files.length > 0) {
    data.files.forEach((file) => {
      formData.append("files[]", file);
    });
  }

  try {
    const result = await postNotulen(rapatId, formData);
    Swal.fire("Berhasil", result.message || "Notulensi berhasil dibuat", "success");
    return { success: true, message: result.message, data: result.notulensi };
  } catch (error) {
    Swal.fire("Gagal", error.message || "Gagal membuat notulensi", "error");
    return { success: false, message: error.message };
  }
};