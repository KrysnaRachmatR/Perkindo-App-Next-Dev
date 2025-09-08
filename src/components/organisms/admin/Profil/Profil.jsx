"use client";
import { useEffect } from "react";
import { useProfile } from "./HandlerProfil";

export default function ProfilPage() {
  const {
    profile,
    formData,
    setFormData,
    message,
    loading,
    loadProfile,
    handleSubmit,
  } = useProfile();

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manajemen Profil</h1>

      {/* Preview Gambar */}
      {profile?.header_image && (
        <div className="mb-4">
          <img
            src={profile.header_image}
            alt="Header"
            className="w-full max-w-md rounded-lg shadow"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Judul */}
        <div>
          <label className="block font-medium mb-1">Judul</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="border rounded p-2 w-full"
          />
        </div>

        {/* Section 1 */}
        <div>
          <label className="block font-medium mb-1">Section 1</label>
          <textarea
            value={formData.section1}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, section1: e.target.value }))
            }
            className="border rounded p-2 w-full"
          />
        </div>

        {/* Visi */}
        <div>
          <label className="block font-medium mb-1">Visi</label>
          <input
            type="text"
            value={formData.visi}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, visi: e.target.value }))
            }
            className="border rounded p-2 w-full"
          />
        </div>

        {/* Misi (dinamis) */}
        <div>
          <label className="block font-medium mb-2">Misi</label>
          {formData.misi.map((misiItem, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={misiItem}
                onChange={(e) => {
                  const newMisi = [...formData.misi];
                  newMisi[i] = e.target.value;
                  setFormData((prev) => ({ ...prev, misi: newMisi }));
                }}
                className="border rounded p-2 w-full"
              />
              <button
                type="button"
                onClick={() => {
                  const newMisi = formData.misi.filter((_, idx) => idx !== i);
                  setFormData((prev) => ({ ...prev, misi: newMisi }));
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, misi: [...prev.misi, ""] }))
            }
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Tambah Misi
          </button>
        </div>

        {/* Upload Gambar */}
        <div>
          <label className="block font-medium mb-1">Header Image</label>
          <input
            type="file"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
            }
            className="border rounded p-2 w-full"
          />
        </div>

        {/* Tombol Simpan */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded shadow"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>

      {/* Pesan */}
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
