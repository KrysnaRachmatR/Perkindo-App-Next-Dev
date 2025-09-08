import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { createNotulensi, getAllNotulensi } from "./RapatService";
import { fetchAllNotulensi, fetchUpdateNotulensi  } from "./RapatController";

export const useNotulenHandler = (rapatId, onSuccess) => {
  const [isi, setIsi] = useState("");
  const [files, setFiles] = useState([]);
  const [notulensiList, setNotulensiList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleIsiChange = (e) => setIsi(e.target.value);

  const handleFileChange = (e) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rapatId) {
      setError("Pilih rapat terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("isi", isi);
      files.forEach((file) => formData.append("files[]", file));

      Swal.fire({
        title: "Menyimpan Notulensi...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await createNotulensi(rapatId, formData);
      Swal.fire("Berhasil", "Notulensi berhasil disimpan.", "success");

      setIsi("");
      setFiles([]);
      if (onSuccess) onSuccess();
    } catch (err) {
      const message = err?.response?.data?.message || "Gagal menyimpan notulensi.";
      Swal.fire("Gagal", message, "error");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNotulensi = async (notulensiId) => {
  if (!isi || isi.trim() === "") {
    Swal.fire("Peringatan", "Isi notulensi tidak boleh kosong.", "warning");
    return false;
  }

  const formData = new FormData();
  formData.append("isi", isi); // pakai isi dari useState
  files.forEach((file) => formData.append("files[]", file));

  setLoading(true);

  try {
    Swal.fire({
      title: "Memperbarui Notulensi...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    await fetchUpdateNotulensi(notulensiId, formData); // pastikan `fetchUpdateNotulensi` menerima FormData
    Swal.fire("Berhasil", "Notulensi berhasil diperbarui.", "success");

    setIsi(""); // kosongkan inputan
    setFiles([]); // kosongkan file
    if (onSuccess) onSuccess();

    return true;
  } catch (err) {
    const message = err?.message || "Gagal memperbarui notulensi.";
    Swal.fire("Gagal", message, "error");
    setError(message);
    return false;
  } finally {
    setLoading(false);
  }
  };

  const loadNotulensi = async () => {
    try {
      const response = await getAllNotulensi();
      if (response.success) {
        setNotulensiList(response.data);
      } else {
        console.error("Gagal mengambil semua notulensi:", response.message);
      }
    } catch (error) {
      console.error("Error fetching all notulensi:", error);
    }
  };

  useEffect(() => {
    loadNotulensi();
  }, []);

  return {
    isi,
    setIsi,
    files,
    notulensiList,
    loading,
    error,
    handleIsiChange,
    handleFileChange,
    handleSubmit,
    fetchAllNotulensi,
    handleUpdateNotulensi,
    loadNotulensi, // optional jika ingin pakai dari luar
  };
};
