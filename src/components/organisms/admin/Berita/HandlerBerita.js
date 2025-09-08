import { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import { fetchBerita, createBerita, editBerita, removeBerita } from "./ControllerBerita";
import { fetchBerita, createBerita, editBerita, removeBerita } from "./ControllerBerita";

export const useBeritaHandler = () => {
  const [form, setForm] = useState({
    title: "",
    caption: "",
    gambar: null,
  });

  const [berita, setBerita] = useState([]);
  const [selectedBerita, setSelectedBerita] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const resetForm = () => {
    setForm({
      title: "",
      caption: "",
      gambar: null,
    });
  };

  const loadBerita = async () => {
    setLoading(true);
    const result = await fetchBerita();
    if (result.success) {
      setBerita(result.data);
    } else {
      setMessage(result.message);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setSaving(true);
    const result = await createBerita(form);
    if (result.success) {
      setBerita((prev) => [...prev, result.data]);
      Swal.fire("Sukses", "Berita berhasil ditambahkan", "success");
      resetForm();
      setIsOpen(false);
    } else {
      Swal.fire("Error", result.message, "error");
    }
    setSaving(false);
  };

  const handleEdit = async () => {
    if (!selectedBerita) return;
    setSaving(true);
    const result = await editBerita(selectedBerita.id, form);
    if (result.success) {
      setBerita((prev) =>
        prev.map((item) => (item.id === selectedBerita.id ? result.data : item))
      );
      Swal.fire("Sukses", "Berita berhasil diupdate", "success");
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
      title: "Hapus berita?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      const response = await removeBerita(id);
      const result = response?.data ?? response; // antisipasi kalau axios return {data: {...}}

      if (result.success) {
        setBerita((prev) => prev.filter((item) => item.id !== id));
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: "Berita berhasil dihapus",
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
    loadBerita();
  }, []);

  return {
    form,
    setForm,
    berita,
    selectedBerita,
    setSelectedBerita,
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
