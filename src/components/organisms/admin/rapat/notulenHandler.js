import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  fetchCreateNotulensi
} from "./rapatController";
import { 
    postNotulen 
} from "./rapatService";

export const useNotulenHandler = () => {
  const [isi, setIsi] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitNotulen = async (e, rapatId) => {
  e.preventDefault(); // ✅ cegah refresh

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

    await postNotulen(rapatId, formData);
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


    return{
        submitNotulen,
        isi,
        files,
        setIsi,
        setFiles,
        loading,
        setLoading,
        error,
    }

};