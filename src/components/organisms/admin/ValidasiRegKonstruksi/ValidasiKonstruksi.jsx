"use client";

import React from "react";
import Toast from "@/components/atoms/ToastAlert";
import { useConfirm } from "@/hooks/useConfirm";
import { Check, X, Download, Eye, Search, FileText, Building2 } from "lucide-react";
import { useSbusHandler } from "./SbusHandler";

const ValidasiSBUS = () => {
  const { confirm, Modal } = useConfirm();
  const {
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
  } = useSbusHandler(confirm);

  const closeModal = () => setDetailData(null);

  const formatDate = (rawDate) => {
    if (!rawDate) return "-";
    const date = new Date(rawDate);
    return isNaN(date.getTime())
      ? "-"
      : date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Validasi SBU Konstruksi
            </h1>
          </div>
          <p className="text-gray-600">Kelola dan validasi sertifikat badan usaha konstruksi</p>
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
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                {tab}
                <span className="ml-2 text-xs opacity-75">
                  {idx === 0 ? `(${sbUs.length})` : `(${activeSbUs.length})`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Section Pending */}
        {activeTab === 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                SBU Menunggu Validasi
              </h2>
              <div className="text-sm text-gray-500">
                Total: {sbUs.length} pengajuan
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50/80">
                    <tr>
                      {["No", "Perusahaan", "Direktur", "Alamat", "Kode SBU", "Klasifikasi", "Sub Klasifikasi", "Tanggal Daftar", "Aksi"].map((header) => (
                        <th key={header} className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sbUs.length > 0 ? (
                      sbUs.map((sbu, i) => (
                        <tr key={sbu.id} className="hover:bg-blue-50/30 transition-colors duration-150">
                          <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 text-center">
                            {i + 1}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{sbu.nama_perusahaan}</div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{sbu.nama_direktur}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{sbu.alamat_perusahaan}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {sbu.sbu_code}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{sbu.nama_klasifikasi}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{sbu.nama_sub_klasifikasi}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{formatDate(sbu.created_at)}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex gap-1.5">
                              <button 
                                onClick={() => handleApprove(sbu.id)} 
                                className="p-2 rounded-lg border border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                                title="Setujui"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleReject(sbu.id)} 
                                className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                                title="Tolak"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDownload(sbu.id, sbu.nama_perusahaan, sbu.nama_klasifikasi, sbu.nama_sub_klasifikasi)
                                }
                                className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
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
                        <td colSpan={9} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-gray-100 rounded-full">
                              <FileText className="w-8 h-8 text-gray-400" />
                            </div>
                            <div className="text-gray-500">
                              {loading ? "Memuat data..." : error || "Belum ada pengajuan SBU"}
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

        {/* Section Aktif */}
        {activeTab === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-green-600" />
                SBU Aktif
              </h2>
              
              {/* Search Bar */}
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari perusahaan, direktur, atau kode SBU..."
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50/80">
                    <tr>
                      {["No", "Perusahaan", "Direktur", "Alamat", "Kode SBU", "Klasifikasi", "Sub Klasifikasi", "Tgl Diterima", "Expired", "Status", "Detail"].map((header) => (
                        <th key={header} className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(searchKeyword ? filteredSbUs : activeSbUs).map((sbu, i) => (
                      <tr key={sbu.id} className="hover:bg-green-50/30 transition-colors duration-150">
                        <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 text-center">
                          {i + 1}
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{sbu.nama_perusahaan}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{sbu.nama_direktur}</td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 max-w-xs">
                          <div className="truncate" title={sbu.alamat_perusahaan}>
                            {sbu.alamat_perusahaan}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            {sbu.sbu_code}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{sbu.nama_klasifikasi}</td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{sbu.nama_sub_klasifikasi}</td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{formatDate(sbu.created_at)}</td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{formatDate(sbu.expired_at)}</td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {sbu.status_aktif}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <button 
                            onClick={() => setDetailData(sbu)} 
                            className="p-2.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:scale-105"
                            title="Lihat Detail"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {(searchKeyword ? filteredSbUs : activeSbUs).length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-gray-100 rounded-full">
                      <Building2 className="w-10 h-10 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {searchKeyword ? "Tidak ada hasil" : "Belum ada SBU aktif"}
                      </h3>
                      <p className="text-gray-500">
                        {searchKeyword ? "Coba kata kunci yang berbeda" : "SBU aktif akan muncul di sini setelah divalidasi"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Detail - Enhanced */}
        {detailData && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Detail SBU</h3>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Nama Perusahaan", value: detailData.nama_perusahaan, icon: Building2 },
                    { label: "Nama Direktur", value: detailData.nama_direktur, icon: null },
                    { label: "Alamat Perusahaan", value: detailData.alamat_perusahaan, icon: null, span: true },
                    { label: "Kode SBU", value: detailData.sbu_code, icon: null, badge: true },
                    { label: "Klasifikasi", value: detailData.nama_klasifikasi, icon: null },
                    { label: "Sub Klasifikasi", value: detailData.nama_sub_klasifikasi, icon: null },
                    { label: "Status", value: detailData.status_aktif, icon: null, badge: true, color: "green" },
                    { label: "Tanggal Diterima", value: formatDate(detailData.created_at), icon: null },
                    { label: "Tanggal Expired", value: formatDate(detailData.expired_at), icon: null }
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`${item.span ? "md:col-span-2" : ""} p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200`}
                    >
                      <div className="flex items-start gap-3">
                        {item.icon && (
                          <div className="p-1.5 bg-blue-100 rounded-md mt-0.5">
                            <item.icon className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <dt className="text-sm font-medium text-gray-600 mb-1">{item.label}</dt>
                          <dd className="text-sm text-gray-900">
                            {item.badge ? (
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                item.color === "green" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                                {item.value}
                              </span>
                            ) : (
                              <span className={item.span ? "" : "block truncate"}>
                                {item.value}
                              </span>
                            )}
                          </dd>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {Modal}
      </div>
    </div>
  );
};

export default ValidasiSBUS;