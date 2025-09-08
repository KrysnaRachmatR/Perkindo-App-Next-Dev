import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { fetchGaleri, createGaleri, editGaleri, removeGaleri } from "./ControllerGaleri";

export const useGaleriHandler = () => {
  const [form, setForm] = useState({
    judul: "",
    caption: "",
    gambar: null,
  });

  const [galeri, setGaleri] = useState([]);
  const [selectedGaleri, setSelectedGaleri] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const resetForm = () => {
    setForm({
      judul: "",
      caption: "",
      gambar: null,
    });
  };

  const loadGaleri = async () => {
    setLoading(true);
    const result = await fetchGaleri();
    if (result.success) {
      setGaleri(result.data);
    } else {
      setMessage(result.message);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setSaving(true);
    const result = await createGaleri(form);
    if (result.success) {
      setGaleri((prev) => [...prev, result.data]);
      Swal.fire("Sukses", "Galeri berhasil ditambahkan", "success");
      resetForm();
      setIsOpen(false);
    } else {
      Swal.fire("Error", result.message, "error");
    }
    setSaving(false);
  };

  const handleEdit = async () => {
    if (!selectedGaleri) return;
    setSaving(true);
    const result = await editGaleri(selectedGaleri.id, form);
    if (result.success) {
      setGaleri((prev) =>
        prev.map((item) => (item.id === selectedGaleri.id ? result.data : item))
      );
      Swal.fire("Sukses", "Galeri berhasil diupdate", "success");
      resetForm();
      setIsEditModalOpen(false);
    } else {
      Swal.fire("Error", result.message, "error");
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
  try {
    const confirm = await Swal.fire({
      title: "Hapus galeri?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      const response = await removeGaleri(id);
      const result = response?.data ?? response; // antisipasi kalau axios return {data: {...}}

      if (result.success) {
        setGaleri((prev) => prev.filter((item) => item.id !== id));
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: "Galeri berhasil dihapus",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message || "Gagal menghapus berita",
        });
      }
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error?.message || "Terjadi kesalahan",
    });
  }
  };


  useEffect(() => {
    loadGaleri();
  }, []);

  return {
    form,
    setForm,
    galeri,
    selectedGaleri,
    setSelectedGaleri,
    isOpen,
    isEditModalOpen,
    loading,
    saving,
    message,
    setIsOpen,
    setIsEditModalOpen,
    resetForm,
    handleSubmit,
    handleEdit,
    handleDelete,
  };
};
