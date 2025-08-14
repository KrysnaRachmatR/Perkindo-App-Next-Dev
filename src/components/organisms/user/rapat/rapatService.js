import api from "@/services/api";

export const getRapat = async () => {
  try {
    const response = await api.get('/user/rapat/undangan', {
      headers: {
        'ngrok-skip-browser-warning': 'true' // harus string
      }
    });
    return {
      success: true,
      data: Array.isArray(response.data.rapats) ? response.data.rapats : [], // ✅ pastikan array
      message: response.data.message,
    };
  } catch (error) {
    console.error("Gagal Mengambil Undangan", error);
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengambil undangan rapat", 
    };
  }
};

export const getNotulen = async (rapatId) => {
  console.log("Mendapatkan notulen dari backend untuk rapatId:", rapatId);
  try {
    const response = await api.get(`/user/rapat/${rapatId}/notulensi`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error dari getNotulen:", error);
    throw error?.response?.data ?? { message: "Gagal mengambil notulensi" };
  }
};

export const getAllNotulensi = async () => {
  try {
    const response = await api.get("/user/rapat/notulensi",{
      headers: {
        'ngrok-skip-browser-warning' : 'true'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data notulensi:", error);
    throw error;
  }
};

export const putNotulen = async (notulensiId, formData) => {
  try {
    const response = await api.post(
      `/jembot/rapat/${notulensiId}/notulensi`,
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

export const createNotulensi = async(rapatId, formData) => {
    try{
        const response = await api.post(`/user/rapat/${rapatId}/notulensi`, formData,{
            headers: {
                "Content-Type" : "multipart/form-data",
            },
        });
        return response.data;
    }catch(error){
        console.error("Error createNotulensi:", error);
        throw error?.response?.data || {message: "Gagal menyimpan notulensi"};
    }
};

export const fetchUserData = async () => {
  try {
    const response = await api.get("/user", {
      headers: {
        'ngrok-skip-browser-warning': 'true' 
      }
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message || "Gagal mengambil data pengguna",
    };
  }
};

export const getRapatDone = async () => {
    try {
        const response  = await api.get('/user/rapat/done', {
          headers: {
            'ngrok-skip-browser-warning': 'true' // harus string
          }
        });
        return  response.data;
    }catch (error){
        console.error("error fecthing rapat:", error);
        return {success: false, message: "Gagal mengambil data rapat"};
    }
};

export const decideRapat = async (rapatId, status, catatan = "") => {
  try {
    const response = await api.post(`/user/rapat/${rapatId}/ketua/decision`, {
      status,
      catatan,
    }, {
      headers: {
        'ngrok-skip-browser-warning': 'true' // harus string
      }
    });
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Gagal mengirim keputusan rapat.";
    throw new Error(message); // 👈 penting agar `catch` di handleApprove bisa menanggapinya
  }
};

export const checkHadirRapat = async (rapatId, status, alasan = "") => {
  try {
    const response = await api.post(`/user/rapat/${rapatId}/konfirmasi-kehadiran`, {
      status,
      alasan,
    }, {
      headers: {
        'ngrok-skip-browser-warning': 'true' // harus string
      }
    });
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Gagal mengirim keputusan rapat.";
    throw new Error(message); // 👈 penting agar `catch` di handleApprove bisa menanggapinya
  }
};

export const postPollingTanggal = async (rapatId, payload) => {
  try {
    const response = await api.post(`/user/rapat/${rapatId}/polling-tanggal`, payload, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting polling tanggal:", error);
    throw error?.response?.data || { message: "Gagal mengirim polling tanggal" };
  }
};

export const getUserRapatDone = async () => {
  try {
    const response = await api.get('/user/rapat/user-done', {
      headers: {
        'ngrok-skip-browser-warning': 'true' // harus string
      }
    });

    return {
      success: true,
      data: Array.isArray(response.data.data) ? response.data.data : [],
      message: response.data.message || "Berhasil mengambil rapat selesai user"
    };
  } catch (error) {
    console.error("Gagal mengambil rapat yang telah selesai:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengambil rapat yang telah selesai",
    };
  }
};

export const postTtdAbsen = async (rapatId, ttdBlob) => {
  try {
    const formData = new FormData();

    formData.append("id_rapat", rapatId); // ← penting!

    if (ttdBlob) {
      if (!(ttdBlob instanceof Blob)) {
        throw new Error("Tanda tangan tidak valid");
      }
      formData.append("signature", ttdBlob, "ttd.png");
    }

    const res = await api.post(`/user/rapat/${rapatId}/absen`, formData);

    return res.data;
  } catch (error) {
    console.error("Error postTtdAbsen:", error);
    throw new Error(error.response?.data?.message || "Gagal memproses tanda tangan");
  }
};

export const downloadNotulensiZip = async (rapatId) => {
  if (!rapatId) throw new Error("rapatId tidak boleh kosong!");

  try {
    const response = await api.get(`/user/notulensi/${rapatId}/download`, {
      responseType: "blob", // penting supaya file terbaca sebagai binary
    });
    return response;
  } catch (error) {
    console.error("Gagal download notulensi ZIP:", error);
    throw error;
  }
};





