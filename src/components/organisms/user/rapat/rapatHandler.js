import { useState, useEffect } from "react";
import { fetchUserData, 
  getRapat, 
  createNotulensi, 
  putNotulen, 
  decideRapat, 
  getRapatDone, 
  checkHadirRapat, 
  postPollingTanggal, 
  downloadNotulensiZip,
   } from "./rapatService";

  import { fetchUserRapatDone, fetchUndanganController, kirimAbsensiRapat, handleDownloadNotulensi} from "./rapatController";

export const useRapatHandler = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [decisionResult, setDecisionResult] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const [user, setUser] = useState(null);
  const [rapats, setRapats] = useState([]);
  const [rapatUndangan, setRapatUndangan] = useState([]);
  const [rapatDone, setRapatDone] = useState([]);
  const [userRapatDone, setUserRapatDone] = useState([]);
  const [isi, setIsi] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingNotulen, setLoadingNotulen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [errorDownload, setErrorDownload] = useState(null);
  const handleIsiChange = (e) => setIsi(e.target.value);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingNotulen(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("isi", isi);
      files.forEach((file) => formData.append("files[]", file));

      const rapatId = rapatDone[0]?.id;
      if (!rapatId) throw new Error("Rapat belum tersedia");

      await createNotulensi(rapatId, formData);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Gagal menyimpan notulensi. Coba lagi."
      );
    } finally {
      setLoadingNotulen(false);
    }
  };

  const handleUpdateNotulensi = async (rapatId) => {
  setLoadingNotulen(true);
  setError(null);

  try {
    const formData = new FormData();
    formData.append("isi", isi);
    files.forEach((file) => formData.append("files[]", file));

    // Kirim sebagai POST + _method=PUT jika backend butuh
    formData.append("_method", "PUT");

    const response = await putNotulen(rapatId, isi, files); // kamu juga bisa modif agar pakai formData di servicenya
    if (response.success) {
      console.log("Notulensi berhasil diperbarui");
    } else {
      setError(response.message || "Gagal mengupdate notulensi.");
    }
  } catch (err) {
    console.error("Update error:", err);
    setError(err?.response?.data?.message || "Terjadi kesalahan saat update.");
  } finally {
    setLoadingNotulen(false);
  }
  };

  const decide = async (rapatId, status, catatan = "") => {
  setIsProcessing(true);
  try {
    const result = await decideRapat(rapatId, status, catatan);
    setDecisionResult(result);
    return result;
  } catch (err) {
    setDecisionResult({ success: false, message: err.message });
    throw err; // ✅ LEMPAR LAGI supaya bisa ditangkap di handleApprove
  } finally {
    setIsProcessing(false);
  }
  };

  const check = async (rapatId, status, alasan = "") => {
  try {
    const result = await checkHadirRapat(rapatId, status, alasan);
    setCheckResult(result);
    return result;
  } catch (err) {
    setCheckResult({ success: false, message: err.message });
    throw err;
  }
  };

  const postPolling = async (rapatId, tanggalYangDipilih) => {
  try {
    const response = await postPollingTanggal(rapatId, {
      tanggal_yang_dipilih: tanggalYangDipilih,
    });

    if (response.polling) {
      return {
        success: true,
        data: response.polling,
        message: response.message,
      };
    } else {
      return {
        success: false,
        message: response.message || "Polling gagal dikirim.",
      };
    }
  } catch (error) {
    console.error("Error posting polling tanggal:", error);

    const errMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Terjadi konflik saat mengirim polling.";

    return {
      success: false,
      message: errMsg,
    };
  }
  };

  const loadUserRapatDone = async () => {
  try {
    const response = await fetchUserRapatDone();
    if (response.success) {
      setUserRapatDone(response.data); // ✅ pakai state yang benar
    } else {
      console.error("Gagal mengambil rapat selesai:", response.message);
    }
  } catch (error) {
    console.error("Error fetching rapat done:", error);
  }
  }; 

  const downloadNotulensi = async (rapatId) => {
    setLoadingDownload(true);
    setErrorDownload(null);

    try {
      await handleDownloadNotulensi(rapatId);
    } catch (error) {
      setErrorDownload("Gagal mendownload notulensi.");
    } finally {
      setLoadingDownload(false);
    }
  };



  useEffect(() => {
    loadUserRapatDone();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetchUserData();
        if (userRes.success) setUser(userRes.data);

        const rapatRes = await getRapat();
        if (rapatRes.success) {
          const all = rapatRes.data;
          // setRapats(all);
          setRapatUndangan(all);
        }
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRapatDone = async () => {
      try {
        const response = await getRapatDone();
        if (response.success) {
          setRapatDone(response.data);
        } else {
          console.error("Gagal mengambil rapat selesai:", response.message);
        }
      } catch (error) {
        console.error("Error fetching rapat done:", error);
      }
    };

    fetchRapatDone();
  }, []);

  return {
    user,
    rapats,
    rapatUndangan,
    rapatDone,
    loading,
    isi,
    setIsi,
    files,
    error,
    loadingNotulen,
    isProcessing,
    decisionResult,
    userRapatDone,
    loadUserRapatDone,
    checkResult,
    postPolling,
    check,
    decide,
    handleIsiChange,
    handleFileChange,
    handleSubmit,
    handleUpdateNotulensi,
    loading,
    errorMsg,
    successMsg,
    setLoading,
    setSuccessMsg,
    loadingDownload,
    errorDownload,
    downloadNotulensi,
  };
};
