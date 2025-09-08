import { useState, useEffect } from "react";
import {
  getPendingSbus,
  getActiveSbus,
  approveSbu,
  rejectSbu,
  downloadSbuFile,
} from "./SbusController";
import { setAuthToken } from "./SbusService";

export const useSbusHandler = (confirm) => {
  const [sbUs, setSbUs] = useState([]);
  const [activeSbUs, setActiveSbUs] = useState([]);
  const [filteredSbUs, setFilteredSbUs] = useState([]);
  const [detailData, setDetailData] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setAuthToken();
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const pending = await getPendingSbus();
      const active = await getActiveSbus();
      setSbUs(pending);
      setActiveSbUs(active);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // approve
  const handleApprove = async (id) => {
    const confirmed = await confirm("confirm", "Apakah yakin menyetujui?");
    if (!confirmed) return;
    try {
      await approveSbu(id);
      setToast({ message: "Berhasil disetujui!", type: "success" });
      fetchAllData();
    } catch (err) {
      setToast({ message: err, type: "error" });
    }
  };

  // reject
  const handleReject = async (id) => {
    const komentar = prompt("Masukkan komentar penolakan:");
    const confirmed = await confirm("delete", "Apakah yakin menolak?");
    if (!confirmed) return;
    try {
      await rejectSbu(id, komentar);
      setToast({ message: "Berhasil ditolak!", type: "success" });
      fetchAllData();
    } catch (err) {
      setToast({ message: err, type: "error" });
    }
  };

  // download
  const handleDownload = async (registrationId, userId, klasifikasiId, subKlasifikasiId) => {
    try {
      const res = await downloadSbuFile(registrationId);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${userId}_${klasifikasiId}_${subKlasifikasiId}_sbus.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setToast({ message: "Gagal mengunduh file", type: "error" });
    }
  };

  // search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchKeyword.trim() === "") {
        setFilteredSbUs([]);
        return;
      }
      const filtered = activeSbUs.filter((sbu) =>
        (sbu.nama_perusahaan?.toLowerCase() || "").includes(searchKeyword.toLowerCase()) ||
        (sbu.nama_direktur?.toLowerCase() || "").includes(searchKeyword.toLowerCase()) ||
        (sbu.sbu_code?.toLowerCase() || "").includes(searchKeyword.toLowerCase())
      );
      setFilteredSbUs(filtered);
    }, 300);
    return () => clearTimeout(delay);
  }, [searchKeyword, activeSbUs]);

  return {
    sbUs,
    activeSbUs,
    filteredSbUs,
    detailData,
    setDetailData,
    searchKeyword,
    setSearchKeyword,
    loading,
    error,
    toast,
    setToast,
    activeTab,
    setActiveTab,
    handleApprove,
    handleReject,
    handleDownload,
  };
};
