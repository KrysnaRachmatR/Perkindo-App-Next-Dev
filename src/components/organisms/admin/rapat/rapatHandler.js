import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  fetchRapat,
  createRapat,
  editRapat,
  deleteRapat,
  fetchUsers,
  fetchRapatMenungguPolling,
  createOptionTanggal as tambahPollingTanggalService,
} from "./rapatController";
import { postNotulen } from "./rapatService";

export const useRapatHandler = () => {
  const [form, setForm] = useState({
    nomor: "",
    lampiran: "",
    hal: "",
    judul: "",
    agenda: "",
    lokasi: "",
    tanggal_terpilih: "",
    jam: "",
    urgensi: "rendah",
    topik: [""],
    peserta: [{ user_id: "" }],
    header_image: null,
    tanda_tangan_image: null,
  });

  const [rapat, setRapat] = useState([]);
  const [users, setUsers] = useState([]);
  const [pollingData, setPollingData] = useState([]);
  const [opsiTanggal, setOpsiTanggal] = useState([]);

  const [selectedRapat, setSelectedRapat] = useState(null);
  const [selectedRapatId, setSelectedRapatId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPollingModalOpen, setPollingModalOpen] = useState(false);

  const [isi, setIsi] = useState("");
  const [files, setFiles] = useState([]);
  const [notulensiList, setNotulensiList] = useState([]);
  

  const [activeTab, setActiveTab] = useState(0);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setForm({
      nomor: "",
      lampiran: "",
      hal: "",
      judul: "",
      agenda: "",
      lokasi: "",
      tanggal_terpilih: "",
      jam: "",
      urgensi: "rendah",
      topik: [""],
      peserta: [{ user_id: "" }],
      header_image: null,
      tanda_tangan_image: null,
    });
  };

  const loadRapat = async () => {
    const result = await fetchRapat();
    if (result.success) setRapat(result.data);
    setLoading(false);
  };

  const loadPollingData = async () => {
    setLoading(true);
    const { data, error } = await fetchRapatMenungguPolling();
    if (!error) setPollingData(data);
    else console.error(error);
    setLoading(false);
  };

  const loadUser = async () => {
    const result = await fetchUsers();
    if (result.success) setUsers(result.data);
    setLoading(false);
  };

  const openModal = (rapat) => {
    setSelectedRapat(rapat);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRapat(null);
  };

  const openEditModal = (rapat) => {
    setSelectedRapat(rapat);
    setForm({
      nomor: rapat.nomor || "",
      lampiran: rapat.lampiran || "",
      hal: rapat.hal || "",
      judul: rapat.judul || "",
      agenda: rapat.agenda || "",
      lokasi: rapat.lokasi || "",
      tanggal_terpilih: rapat.tanggal_terpilih?.slice(0, 10) || "",
      jam: rapat.jam?.slice(0, 5) || "",
      urgensi: rapat.urgensi || "rendah",
      topik: rapat.topik?.length ? rapat.topik : [""],
      peserta: rapat.peserta_rapats?.map((p) => ({ user_id: p.user_id })) || [
        { user_id: "" },
      ],
      header_image: null,
      tanda_tangan_image: null,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedRapat(null);
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleTopikChange = (index, value) => {
    const updated = [...form.topik];
    updated[index] = value;
    setForm((prev) => ({ ...prev, topik: updated }));
  };

  const addTopik = () => {
    setForm((prev) => ({ ...prev, topik: [...prev.topik, ""] }));
  };

  const removeTopik = (index) => {
    setForm((prev) => ({
      ...prev,
      topik: prev.topik.filter((_, i) => i !== index),
    }));
  };

  const handlePesertaChange = (index, value) => {
    const updated = [...form.peserta];
    updated[index].user_id = value;
    setForm((prev) => ({ ...prev, peserta: updated }));
  };

  const addPeserta = () => {
    setForm((prev) => ({ ...prev, peserta: [...prev.peserta, { user_id: "" }] }));
  };

  const removePeserta = (index) => {
    const updated = [...form.peserta];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, peserta: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const isEdit = !!selectedRapat;
      const rapatId = selectedRapat?.id;

      const result = isEdit
        ? await editRapat(rapatId, form)
        : await createRapat(form);

      if (result && result.success) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.message || (isEdit ? "Rapat diperbarui." : "Rapat dibuat."),
          timer: 2000,
          showConfirmButton: false,
        });

        resetForm();
        await loadRapat();
        isEdit ? closeEditModal() : closeModal();
      } else {
        Swal.fire("Gagal", result.message || "Terjadi kesalahan.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message || "Terjadi kesalahan.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRapat = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "Yakin ingin menghapus?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (!confirm.isConfirmed) return;

      const result = await deleteRapat(id);
      if (result.success) {
        Swal.fire("Berhasil", result.message, "success");
        loadRapat();
      } else {
        Swal.fire("Gagal", result.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Terjadi kesalahan.", "error");
    }
  };

  const openPollingModal = (id) => {
    setSelectedRapatId(id);
    setOpsiTanggal([]);
    setPollingModalOpen(true);
  };

  const closePollingModal = () => {
    setSelectedRapatId(null);
    setOpsiTanggal([]);
    setPollingModalOpen(false);
  };

  const handleAddTanggal = (tgl) => {
    if (!opsiTanggal.includes(tgl)) {
      setOpsiTanggal([...opsiTanggal, tgl]);
    }
  };

  const handleRemoveTanggal = (tgl) => {
    setOpsiTanggal(opsiTanggal.filter((d) => d !== tgl));
  };

  const submitPollingTanggal = async (rapatId) => {
    setLoading(true);
    try {
      await tambahPollingTanggalService(rapatId, opsiTanggal);
      setResponse("Berhasil menyimpan opsi tanggal.");
      setError(null);
      closePollingModal();
      loadPollingData();
    } catch (err) {
      setError("Gagal menyimpan data.");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const submitNotulen = async (rapatId) => {
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
  }

  useEffect(() => {
    loadRapat();
    loadPollingData();
    loadUser();
  }, []);

  useEffect(() => {
    if (message?.text) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return {
    form,
    setForm,
    rapat,
    users,
    pollingData,
    opsiTanggal,
    selectedRapat,
    selectedRapatId,
    isOpen,
    isEditModalOpen,
    isPollingModalOpen,
    activeTab,
    loading,
    saving,
    error,
    response,
    message,
    openModal,
    closeModal,
    openEditModal,
    closeEditModal,
    openPollingModal,
    closePollingModal,
    handleInputChange,
    handleFileChange,
    handleTopikChange,
    addTopik,
    removeTopik,
    handlePesertaChange,
    addPeserta,
    removePeserta,
    handleSubmit,
    handleDeleteRapat,
    submitPollingTanggal,
    handleAddTanggal,
    handleRemoveTanggal,
    setOpsiTanggal,
    setActiveTab,
    resetForm,
    submitNotulen,
    isi,
    setIsi,
    setFiles,
    files,
  };
};