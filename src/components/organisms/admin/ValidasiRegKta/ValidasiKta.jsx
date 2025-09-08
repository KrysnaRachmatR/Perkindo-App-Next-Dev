"use client";

import React, { useState, useEffect } from "react";
import Toast from "@/components/atoms/ToastAlert";
import { useConfirm } from "@/hooks/useConfirm";
import { Check, X, Download, Search, CreditCard, Building2, Mail, MapPin } from "lucide-react";

import { getPendingKTAs, getActiveKTAs } from "./KtaController";
import { handleApprove, handleReject, handleDownload } from "./KtaHandler";

const ValidasiKTA = () => {
  const [ktas, setKtas] = useState([]);
  const [activeKTAs, setActiveKTAs] = useState([]);
  const [filteredKta, setFilteredKta] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [toast, setToast] = useState(null);

  const { confirm, Modal } = useConfirm();

  useEffect(() => {
    getPendingKTAs(setKtas, setError, setLoading);
    getActiveKTAs(setActiveKTAs, setError, setLoading);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const filtered = activeKTAs.filter((kta) => {
        const perusahaan = kta.nama_perusahaan?.toLowerCase() || "";
        const direktur = kta.nama_direktur?.toLowerCase() || "";
        const email = kta.email?.toLowerCase() || "";

        return (
          perusahaan.includes(searchKeyword.toLowerCase()) ||
          direktur.includes(searchKeyword.toLowerCase()) ||
          email.includes(searchKeyword.toLowerCase())
        );
      });
      setFilteredKta(filtered);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchKeyword, activeKTAs]);

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    if (isNaN(date.getTime())) return "Tanggal tidak valid";
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Validasi KTA
            </h1>
          </div>
          <p className="text-gray-600">Kelola dan validasi Kartu Tanda Anggota konstruksi</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200 inline-flex">
            {["Pending", "Aktif"].map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(idx)}
                disabled={loading}
                className={`
                  px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200
                  ${activeTab === idx 
                    ? "bg-purple-600 text-white shadow-sm" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                {tab}
                <span className="ml-2 text-xs opacity-75">
                  {idx === 0 ? `(${ktas.length})` : `(${activeKTAs.length})`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* =================== PENDING TAB =================== */}
        {activeTab === 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                KTA Menunggu Validasi
              </h2>
              <div className="text-sm text-gray-500">
                Total: {ktas.length} pengajuan
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50/80">
                    <tr>
                      {["No", "Perusahaan", "Direktur", "Email", "Alamat", "Kota/Kabupaten", "Tanggal Daftar", "Aksi"].map((header) => (
                        <th key={header} className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {ktas.length > 0 ? (
                      ktas.map((kta, index) => (
                        <tr key={kta.id} className="hover:bg-purple-50/30 transition-colors duration-150">
                          <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 text-center">
                            {index + 1}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900">{kta.nama_perusahaan}</span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{kta.nama_direktur}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-700">{kta.email}</span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 max-w-xs">
                            <div className="truncate" title={kta.alamat_perusahaan}>
                              {kta.alamat_perusahaan}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-700">{kta.kota_kabupaten}</span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{formatDate(kta.created_at)}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex gap-1.5">
                              <button 
                                onClick={() => handleApprove(kta.id, confirm, () => getPendingKTAs(setKtas, setError, setLoading), setToast)} 
                                className="p-2 rounded-lg border border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-200 hover:scale-105"
                                title="Setujui"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleReject(kta.id, confirm, () => getPendingKTAs(setKtas, setError, setLoading), setToast)} 
                                className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 hover:scale-105"
                                title="Tolak"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDownload(kta.user_id, setToast)} 
                                className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:scale-105"
                                title="Unduh"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-6 py-16 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <div className="p-4 bg-gray-100 rounded-full">
                              <CreditCard className="w-10 h-10 text-gray-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 mb-1">
                                {loading ? "Memuat data..." : "Belum ada pengajuan KTA"}
                              </h3>
                              {error && <p className="text-red-500 text-sm">{error}</p>}
                              {!loading && !error && (
                                <p className="text-gray-500">Pengajuan KTA baru akan muncul di sini</p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =================== AKTIF TAB =================== */}
        {activeTab === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                KTA Aktif
              </h2>
              
              {/* Search Bar */}
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Cari perusahaan, direktur, atau email..."
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50/80">
                    <tr>
                      {["No", "Perusahaan", "Direktur", "Email", "Alamat", "Kota/Kabupaten", "No. KTA", "Tgl Daftar", "Expired", "Unduh"].map((header) => (
                        <th key={header} className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(searchKeyword ? filteredKta : activeKTAs).length > 0 ? (
                      (searchKeyword ? filteredKta : activeKTAs).map((kta, index) => (
                        <tr key={kta.id} className="hover:bg-green-50/30 transition-colors duration-150">
                          <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 text-center">
                            {index + 1}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900">{kta.nama_perusahaan}</span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{kta.nama_direktur}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-700">{kta.email}</span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 max-w-xs">
                            <div className="truncate" title={kta.alamat_perusahaan}>
                              {kta.alamat_perusahaan}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-700">{kta.kota_kabupaten}</span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                              {kta.no_kta}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{formatDate(kta.tanggal_diterima)}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{formatDate(kta.expired_at)}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <button 
                              onClick={() => handleDownload(kta.user_id, setToast)} 
                              className="p-2.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:scale-105"
                              title="Unduh KTA"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="px-6 py-16 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <div className="p-4 bg-gray-100 rounded-full">
                              <CreditCard className="w-10 h-10 text-gray-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 mb-1">
                                {loading ? "Memuat data..." : searchKeyword ? "Tidak ada hasil" : "Belum ada KTA aktif"}
                              </h3>
                              {error && <p className="text-red-500 text-sm">{error}</p>}
                              {!loading && !error && (
                                <p className="text-gray-500">
                                  {searchKeyword ? "Coba kata kunci yang berbeda" : "KTA aktif akan muncul di sini setelah divalidasi"}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {Modal}
      </div>
    </div>
  );
};

export default ValidasiKTA;