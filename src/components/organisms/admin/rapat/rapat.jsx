"use client";

import React, { useEffect } from "react";
import { Dialog } from "@headlessui/react";
// import {Modal} from "@/components/atoms/modal";
import { useRapatHandler } from "./RapatHandler";
import { BASE_URL } from "@/utils/constant";

// Date Picker & locale Indonesia
import DatePicker, { registerLocale } from "react-datepicker";
import { id } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useNotulenHandler } from "./NotulenHandler";

// Registrasi locale dilakukan sekali di useEffect agar tidak error re-register
const Rapat = () => {
  const {
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
  } = useRapatHandler();

  const {
        submitNotulen,
        isi,
        files,
        setIsi,
        setFiles,
        setLoading,
  } = useNotulenHandler();

  function getRelativePath(fullUrl) {
  try {
    const url = new URL(fullUrl);
    return `${BASE_URL}${url.pathname}`; // hasil: "/storage/undangan/rapat-209.pdf"
  } catch (error) {
    console.error("URL tidak valid:", error);
    return null;
  }
  }

  useEffect(() => {
    registerLocale("id", id);
  }, []);

return (
  <>
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-2">Rapat DPD PERKINDO Provinsi Kalimantan Barat</h1>

      <div className="flex mb-4 space-x-4">
        <button
          onClick={() => setActiveTab(0)}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 0
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Buat Rapat
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 1
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Draft Rapat
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 2
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Tab Polling Tanggal
        </button>
      </div>

     {activeTab === 0 && (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Tambah Rapat Baru</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Judul */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Judul</label>
            <input
              type="text"
              name="judul"
              value={form.judul}
              onChange={handleInputChange}
              required
              placeholder="Judul Rapat"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Input Textarea */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "agenda", placeholder: "Agenda" },
              { name: "nomor", placeholder: "Nomor" },
              { name: "lampiran", placeholder: "Lampiran" },
              { name: "hal", placeholder: "Hal" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{field.placeholder}</label>
                <textarea
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Lokasi */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Lokasi</label>
            <input
              type="text"
              name="lokasi"
              value={form.lokasi}
              onChange={handleInputChange}
              placeholder="Lokasi Rapat"
              className="w-full border p-3 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Tanggal & Jam */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
              <DatePicker
                selected={form.tanggal_terpilih}
                onChange={(date) => setForm({ ...form, tanggal_terpilih: date })}
                locale="id"
                dateFormat="dd MMMM yyyy"
                placeholderText="Pilih tanggal"
                className="w-full border p-3 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Jam</label>
              <input
                type="text"
                name="jam"
                value={form.jam}
                onChange={handleInputChange}
                placeholder="Contoh: 14:30"
                pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                required
                className="w-full border p-3 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Urgensi */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Urgensi</label>
            <select
              name="urgensi"
              value={form.urgensi}
              onChange={handleInputChange}
              className="w-full border p-3 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="rendah">Rendah</option>
              <option value="sedang">Sedang</option>
              <option value="tinggi">Tinggi</option>
              <option value="kritis">Kritis</option>
            </select>
          </div>

          {/* Topik */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Topik</label>
            <div className="space-y-2">
              {form.topik.map((t, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={t}
                    onChange={(e) => handleTopikChange(i, e.target.value)}
                    placeholder={`Topik ${i + 1}`}
                    className="flex-1 border p-3 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeTopik(i)}
                    title="Hapus Topik"
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addTopik}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              + Tambah Topik
            </button>
          </div>

          {/* Peserta */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Peserta</label>

            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="selectAll"
                onChange={(e) => {
                  if (e.target.checked) {
                    const allPeserta = users.map((u) => ({ user_id: u.id }));
                    setForm((prev) => ({ ...prev, peserta: allPeserta }));
                  } else {
                    setForm((prev) => ({ ...prev, peserta: [{ user_id: "" }] }));
                  }
                }}
              />
              <label htmlFor="selectAll" className="text-sm text-gray-700 dark:text-gray-300">
                Pilih Semua Peserta |  Sesuaikan Dengan Urutan Jabatan
              </label>
            </div>

            <div className="space-y-2">
              {form.peserta.map((p, i) => {
                const selectedUserIds = form.peserta
                  .filter((_, idx) => idx !== i)
                  .map((ps) => ps.user_id);

                const availableUsers = users.filter(
                  (user) => !selectedUserIds.includes(user.id.toString())
                );

                return (
                  <div className="flex gap-2 items-center" key={i}>
                  <select
                    key={i}
                    value={p.user_id}
                    onChange={(e) => handlePesertaChange(i, e.target.value)}
                    required
                    className="flex-1 border p-3 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="">-- Pilih Peserta --</option>
                    {availableUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.nama_direktur} – {user.nama_perusahaan}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removePeserta(i)}
                    title="Hapus Peserta"
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    🗑️
                  </button>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={addPeserta}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              + Tambah Peserta
            </button>
          </div>

          {/* Upload Tanda Tangan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Tanda Tangan (JPG)</label>
            <input
              type="file"
              name="tanda_tangan_image"
              accept=".jpg,.jpeg"
              onChange={handleFileChange}
              className="w-full border p-3 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            />
          </div>

          {/* Tombol Simpan */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 transition text-white font-semibold disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan Rapat"}
          </button>
        </form>
      </div>
     )}

      {activeTab === 1 && (
      <>
        {/* Daftar Rapat */}
        <div className="grid gap-6">
          {rapat.map((r) => (
            <div
              key={r.id}
              className="border border-gray-200 rounded-2xl p-5 shadow-sm bg-white dark:bg-gray-800 transition hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-xl font-semibold text-blue-700 mb-1">{r.judul}</h2>
                  <p className="text-sm text-gray-600">{r.agenda}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`px-3 py-0.5 text-xs rounded-full font-medium ${
                      r.status === "draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : r.status === "finalisasi"
                        ? "bg-blue-100 text-blue-700"
                        : r.status === "selesai"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {r.status?.toUpperCase()}
                  </span>
                  <span
                    className={`px-3 py-0.5 text-xs rounded-full font-medium ${
                      r.urgensi === "rutin"
                        ? "bg-gray-200 text-gray-800"
                        : r.urgensi === "mendesak"
                        ? "bg-red-100 text-red-700"
                        : r.urgensi === "kritis"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {r.urgensi?.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-500 mb-4 space-y-1">
                <p><span className="font-medium text-gray-700">Nomor:</span> {r.nomor}</p>
                <p><span className="font-medium text-gray-700">Lokasi:</span> {r.lokasi}</p>
                <p><span className="font-medium text-gray-700">Tanggal:</span> {r.tanggal_terpilih}</p>
                <p><span className="font-medium text-gray-700">Jam:</span> {r.jam }</p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => openModal(r)}
                  className="inline-flex items-center gap-2 px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail Rapat */}
        {selectedRapat && isOpen && (
          <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

            {/* Content */}
            <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
              <Dialog.Panel className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-all duration-300">
                <div className="p-6 space-y-6 max-h-[90vh] overflow-y-auto">

                  {/* HEADER: Judul, Tanggal, Jam */}
                  <div className="space-y-1">
                    <Dialog.Title className="text-2xl font-bold text-blue-700 dark:text-white">
                      {selectedRapat?.judul}
                    </Dialog.Title>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {selectedRapat?.tanggal_terpilih
                        ? new Date(selectedRapat.tanggal_terpilih).toLocaleDateString("id-ID")
                        : "-"}{" "}
                      | {selectedRapat?.jam || "-"}
                    </p>
                  </div>

                  {/* STATUS, URGENSI, LOKASI */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Status:</strong> {selectedRapat?.status}</p>
                    <p><strong>Urgensi:</strong> {selectedRapat?.urgensi}</p>
                    <p><strong>Lokasi:</strong> {selectedRapat?.lokasi || "-"}</p>
                  </div>

                  {/* AGENDA & TOPIK */}
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-gray-800 dark:text-white">Agenda</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {selectedRapat?.agenda || "-"}
                    </p>

                    <p className="text-base font-semibold text-gray-800 dark:text-white mt-4">Topik</p>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-200">
                      {selectedRapat?.topik?.map((topik, i) => (
                        <li key={i}>{topik}</li>
                      ))}
                    </ul>
                  </div>

                  {/* INFORMASI TAMBAHAN */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Nomor:</strong> {selectedRapat?.nomor || "-"}</p>
                    <p><strong>Hal:</strong> {selectedRapat?.hal || "-"}</p>
                    <p><strong>Lampiran:</strong> {selectedRapat?.lampiran || "-"}</p>
                    <p><strong>Catatan:</strong> {selectedRapat?.catatan || "-"}</p>
                    <p>
                      <strong>Undangan PDF:</strong>{" "}
                      {selectedRapat?.download_url ? (
                        <a
                          href={getRelativePath(selectedRapat.download_url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Unduh File
                        </a>
                      ) : "Belum tersedia"}
                    </p>
                  </div>

                  {/* HEADER SURAT */}
                  {selectedRapat?.header_image && (
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Header Surat:</p>
                      <img
                        src={selectedRapat.header_image}
                        alt="Header"
                        className="w-full rounded border mt-2"
                      />
                    </div>
                  )}

                  {/* PESERTA */}
                  <div>
                    <p className="text-base font-semibold text-gray-800 dark:text-white">Peserta</p>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-200">
                      {selectedRapat?.peserta?.map((p, i) => (
                        <li key={i}>
                          {p.nama_direktur}
                          {p.jabatan && ` (${p.jabatan})`}
                          {p.status_kehadiran && (
                            <span
                              className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${
                                p.status_kehadiran === "hadir"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {p.status_kehadiran === "hadir"
                                ? "Bisa Hadir"
                                : "Tidak Bisa Hadir"}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* POLLING TANGGAL */}
                  {selectedRapat?.polling_tanggal?.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="font-medium text-blue-700 dark:text-blue-300">Polling Tanggal:</p>
                      {selectedRapat.polling_tanggal.map((poll, i) => (
                        <div key={i}>
                          <p className="font-semibold">
                            {new Date(poll.tanggal).toLocaleDateString("id-ID")} ({poll.jumlah_pemilih} pemilih)
                          </p>
                          <ul className="ml-4 list-disc list-inside text-sm">
                            {poll.pemilih.map((p, j) => (
                              <li key={j}>
                                {p.nama_direktur} {p.nama_perusahaan && `- ${p.nama_perusahaan}`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* PEMILIH TANGGAL TERPILIH */}
                  {selectedRapat?.pemilih_tanggal_terpilih?.length > 0 && (
                    <div className="mt-4">
                      <p className="font-medium text-green-700 dark:text-green-400">
                        Pemilih Tanggal Terpilih (
                        {new Date(selectedRapat.tanggal_terpilih).toLocaleDateString("id-ID")}
                        ):
                      </p>
                      <ul className="list-disc list-inside text-sm">
                        {selectedRapat.pemilih_tanggal_terpilih.map((p, i) => (
                          <li key={i}>
                            {p.nama_direktur} {p.nama_perusahaan && `- ${p.nama_perusahaan}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* STATISTIK */}
                  <div className="mt-4 space-y-1 text-sm">
                    <p className="font-medium text-gray-800 dark:text-white">Statistik Kesediaan Hadir:</p>
                    <p>Total Peserta: {selectedRapat?.jumlah_peserta}</p>
                    <p>Jumlah Hadir: {selectedRapat?.jumlah_hadir}</p>
                    <p>Jumlah Tidak Hadir: {selectedRapat?.jumlah_tidak_hadir}</p>
                    <p>Persentase Hadir: {selectedRapat?.persentase_hadir}%</p>
                    <p>Persentase Tidak Hadir: {selectedRapat?.persentase_tidak_hadir}%</p>
                  </div>

                  {/* ABSENSI */}
                  {selectedRapat?.absensi?.length > 0 && (
                    <div className="mt-4">
                      <p className="font-medium text-green-700 dark:text-green-400">Absensi Hari-H:</p>
                      <ul className="list-disc list-inside text-sm">
                        {selectedRapat.absensi.map((a, i) => (
                          <li key={i}>
                            {a.nama_direktur} {a.nama_perusahaan && `- ${a.nama_perusahaan}`}
                            <br />
                            <span className="text-xs text-gray-500">
                              Waktu: {a.waktu_absen
                                ? new Date(a.waktu_absen.replace(" ", "T")).toLocaleString("id-ID")
                                : "-"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* HADIR TAPI TIDAK ABSEN */}
                  {selectedRapat?.peserta_hadir_tapi_tidak_absen?.length > 0 && (
                    <div className="mt-4">
                      <p className="font-medium text-yellow-600 dark:text-yellow-400">
                        Menyatakan Hadir Tapi Tidak Absen:
                      </p>
                      <ul className="list-disc list-inside text-sm">
                        {selectedRapat.peserta_hadir_tapi_tidak_absen.map((p, i) => (
                          <li key={i}>
                            {p.nama_direktur} {p.nama_perusahaan && `- ${p.nama_perusahaan}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* PESERTA TIDAK HADIR */}
                  {selectedRapat?.peserta_tidak_hadir?.length > 0 && (
                    <div className="mt-4">
                      <p className="font-medium text-red-600 dark:text-red-400">Peserta Tidak Hadir:</p>
                      <ul className="list-disc list-inside text-sm">
                        {selectedRapat.peserta_tidak_hadir.map((p, i) => (
                          <li key={i}>
                            {p.nama_direktur} {p.jabatan && `(${p.jabatan})`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CREATOR */}
                  <p className="text-xs text-gray-500 mt-4">
                    Dibuat oleh: <strong>{selectedRapat?.creator?.name}</strong> ({selectedRapat?.creator?.username})
                  </p>
                </div>

                {/* FORM BUAT NOTULENSI */}
                {/* <div className="mt-6 border-t pt-4 p-6">
                  <p className="font-medium text-blue-700 dark:text-blue-300 mb-2">Buat Notulensi</p>
                  <form onSubmit={(e) => submitNotulen(e, selectedRapat.id)} className="space-y-3">
                    <textarea
                      className="w-full border rounded-lg p-2 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      rows="4"
                      placeholder="Tulis notulensi rapat di sini..."
                      value={isi}
                      onChange={(e) => setIsi(e.target.value)}
                      required
                    />
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                      className="block w-full text-sm text-gray-700 dark:text-gray-300"
                      onChange={(e) => setFiles(Array.from(e.target.files))}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
                    >
                      {loading ? "Menyimpan..." : "Simpan Notulensi"}
                    </button>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                  </form>
                </div> */}

                {/* ACTION BUTTONS */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-2xl flex justify-end gap-2 sticky bottom-0">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm rounded-md bg-gray-300 dark:bg-gray-600 text-white hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => {
                      closeModal();
                      setTimeout(() => openEditModal(selectedRapat), 300);
                    }}
                    className="px-4 py-2 text-sm rounded-md bg-orange-500 hover:bg-orange-600 text-white transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRapat(selectedRapat.id)}
                    className="px-4 py-2 text-sm rounded-md bg-rose-600 hover:bg-rose-700 text-white transition"
                  >
                    Hapus
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}

        {/* Modal Edit Rapat */}
          {isEditModalOpen && selectedRapat && (
            <Dialog open={isEditModalOpen} onClose={closeEditModal} className="relative z-50">
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
                <Dialog.Panel className="w-full max-w-2xl bg-white rounded shadow-lg max-h-[90vh] overflow-y-auto">
                  <div className="p-6 space-y-4">
                    <Dialog.Title className="text-xl font-bold mb-4">
                      Edit Rapat: {selectedRapat.judul}
                    </Dialog.Title>

                    <form onSubmit={(e) => handleSubmit(e)} className="space-y-3" encType="multipart/form-data">
                      <input type="text" name="judul" placeholder="Judul" value={form.judul} onChange={handleInputChange} required className="w-full border p-2 rounded" />
                      <textarea name="agenda" placeholder="Agenda" value={form.agenda} onChange={handleInputChange} className="w-full border p-2 rounded" />
                      <textarea name="nomor" placeholder="Nomor" value={form.nomor} onChange={handleInputChange} className="w-full border p-2 rounded" />
                      <textarea name="lampiran" placeholder="Lampiran" value={form.lampiran} onChange={handleInputChange} className="w-full border p-2 rounded" />
                      <textarea name="hal" placeholder="Hal" value={form.hal} onChange={handleInputChange} className="w-full border p-2 rounded" />
                      <input type="text" name="lokasi" placeholder="Lokasi" value={form.lokasi} onChange={handleInputChange} className="w-full border p-2 rounded" />
                      <input type="date" name="tanggal_terpilih" value={form.tanggal_terpilih} onChange={handleInputChange} required className="w-full border p-2 rounded" />
                      <input type="text" name="jam" placeholder="Contoh: 14:30" value={form.jam} onChange={handleInputChange} pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$" required className="w-full border p-2 rounded" />

                      <select name="urgensi" value={form.urgensi} onChange={handleInputChange} className="w-full border p-2 rounded">
                        <option value="rutin">Rendah</option>
                        <option value="mendesak">Sedang</option>
                        <option value="mendesak">Tinggi</option>
                        <option value="kritis">Kritis</option>
                      </select>

                      <div>
                        <label className="text-sm">Topik:</label>
                         {form.topik.map((t, i) => (
                          <div key={i} className="flex items-center gap-2 mt-2">
                            <input
                              type="text"
                              value={t}
                              onChange={(e) => handleTopikChange(i, e.target.value)}
                              className="w-full border p-2 rounded"
                              placeholder={`Topik ${i + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => removeTopik(i)}
                              className="text-red-500 hover:text-red-700 text-sm"
                              title="Hapus Topik"
                            >
                              🗑️
                            </button>
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="text-sm font-medium">Peserta:</label>
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            id="selectAll"
                            onChange={(e) => {
                              if (e.target.checked) {
                                const allPeserta = users.map((u) => ({ user_id: u.id }));
                                setForm((prev) => ({ ...prev, peserta: allPeserta }));
                              } else {
                                setForm((prev) => ({
                                  ...prev,
                                  peserta: [{ user_id: "" }],
                                }));
                              }
                            }}
                          />
                          <label htmlFor="selectAll" className="text-sm text-gray-700">
                            Pilih Semua Peserta
                          </label>
                        </div>

                        {form.peserta.map((p, i) => {
                          const selectedUserIds = form.peserta.filter((_, idx) => idx !== i).map((ps) => ps.user_id);
                          const availableUsers = users.filter((user) => !selectedUserIds.includes(user.id.toString()));
                          return (
                            <select
                              key={i}
                              value={p.user_id}
                              onChange={(e) => handlePesertaChange(i, e.target.value)}
                              className="w-full border p-2 rounded mt-2"
                              required
                            >
                              <option value="">-- Pilih Peserta --</option>
                              {availableUsers.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.nama_direktur} – {user.nama_perusahaan}
                                </option>
                              ))}
                            </select>
                          );
                        })}
                        <button type="button" onClick={addPeserta} className="text-sm text-blue-600 mt-2">
                          + Tambah Peserta
                        </button>
                      </div>

                      <input
                        type="file"
                        name="tanda_tangan_image"
                        accept=".jpg,.jpeg"
                        onChange={handleFileChange}
                        className="w-full border p-2 rounded mt-1"
                      />

                      <div className="flex justify-end gap-2 mt-6">
                        <button type="button" onClick={closeEditModal} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm rounded">
                          Batal
                        </button>
                        <button type="submit" onClick={handleSubmit} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded">
                          Simpan Perubahan
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </div>
            </Dialog>
          )}
      </>
      )}

      {activeTab === 2 && (
        <div className="space-y-6">
          {pollingData.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-300">
              Tidak ada rapat yang menunggu polling.
            </div>
          ) : (
            pollingData.map((rapat) => (
              <div
                key={rapat.id}
                className="border border-gray-300 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-900 shadow"
              >
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  {rapat.judul}
                </h3>

                <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  <p><strong>Agenda:</strong> {rapat.agenda}</p>
                  <p><strong>Lokasi:</strong> {rapat.lokasi}</p>
                  <p><strong>Urgensi:</strong> {rapat.urgensi}</p>
                </div>

                {/* Opsi Tanggal */}
                <div className="mt-5 bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                  <p className="font-semibold text-blue-700 dark:text-blue-200 mb-2">📅 Opsi Tanggal:</p>
                  <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-200">
                    {rapat.opsi_tanggal.map((tanggal, i) => (
                      <li key={i}>
                        {new Date(tanggal).toLocaleDateString("id-ID", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hasil Polling */}
                <div className="mt-5 bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                  <p className="font-semibold text-green-700 dark:text-green-200 mb-2">📊 Hasil Polling:</p>
                  {rapat.polling_tanggal.length === 0 ? (
                    <p className="text-sm italic text-gray-600 dark:text-gray-400">Belum ada hasil polling.</p>
                  ) : (
                    rapat.polling_tanggal.map((poll, i) => (
                      <div key={i} className="mb-3">
                        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                          ✅ {new Date(poll.tanggal).toLocaleDateString("id-ID", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })} – <span className="text-blue-700 dark:text-blue-300">{poll.jumlah_pemilih} pemilih</span>
                        </p>
                        <ul className="list-disc list-inside text-sm ml-5 text-gray-700 dark:text-gray-300">
                          {poll.pemilih.map((p, j) => (
                            <li key={j}>
                              {p.nama_direktur}{p.nama_perusahaan && ` - ${p.nama_perusahaan}`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-4 text-right">
                  <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
                    onClick={() => openPollingModal(rapat.id)}
                  >
                    + Beri Opsi Tanggal
                  </button>
                </div>
              </div>
            ))
          )}
          <Dialog open={isPollingModalOpen} onClose={closePollingModal} className="relative z-50">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
            <Dialog.Panel className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 space-y-5 transition-all duration-300">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Tambah Opsi Tanggal Rapat
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Pilih beberapa tanggal sebagai opsi rapat yang akan dikirim ke peserta.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tanggal Rapat
                </label>
                <DatePicker
                  selected={null}
                  onChange={(date) => {
                    if (!date) return;

                    const localDate = new Date(date);
                    const isoDate = `${localDate.getFullYear()}-${String(
                      localDate.getMonth() + 1
                    ).padStart(2, "0")}-${String(localDate.getDate()).padStart(2, "0")}`;

                    handleAddTanggal(isoDate);
                  }}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Pilih tanggal"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {opsiTanggal.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">
                    Daftar Opsi Tanggal:
                  </p>
                  <ul className="space-y-1">
                    {opsiTanggal.map((tgl) => (
                      <li
                        key={tgl}
                        className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md text-sm"
                      >
                        <span>{tgl}</span>
                        <button
                          onClick={() => handleRemoveTanggal(tgl)}
                          className="text-red-500 hover:text-red-700 font-semibold text-xs"
                        >
                          Hapus
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {response && <p className="text-green-600 text-sm text-center">{response.message}</p>}
              {error && <p className="text-red-600 text-sm text-center">{error}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  onClick={closePollingModal}
                >
                  Batal
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                  onClick={() => submitPollingTanggal(selectedRapatId)}
                  disabled={loading}
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </Dialog.Panel>
          </div>
          </Dialog>
        </div>
      )}
  </div>
  </>
);
}

export default Rapat;