

import { useNotulenHandler } from "./notulenHandler";
import { useRapatHandler } from "./rapatHandler";
import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Swal from "sweetalert2";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const NotulenRapat = () => {
  const [rapatId, setRapatId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editRapatId, setEditRapatId] = useState(null);

const {
files,
fetchAllNotulensi,
handleSubmit,
isi,
error,
loading,
notulensiList,
loadNotulensi,
setIsi,
handleFileChange,
handleUpdateNotulensi,
} = useNotulenHandler(rapatId);

const { 
  rapatDone 
} = useRapatHandler();  

const handleEdit = (notulensi) => {
  setIsi(notulensi.isi); // Isi editor
  editor?.commands.setContent(notulensi.isi); // set editor content saat buka
  openModal(notulensi); // buka modal dan set editId/rapatId
};


const openModal = (notulensi) => {
  setEditId(notulensi.id);
   setEditRapatId(notulensi.rapat_id);
   setShowModal(true);
};

const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setEditRapatId(null);
  };

const editor = useEditor({
  extensions: [StarterKit, Underline],
  content: '',
});

useEffect(() => {
  if (editor && showModal) {
    editor.commands.setContent(isi || "");
  }
}, [editor, showModal]);

useEffect(() => {
  if (!editor) return;
  const handleUpdate = () => {
    setIsi(editor.getText());
  };

  editor.on('update', handleUpdate);

  return () => {
    editor.off('update', handleUpdate);
  };
}, [editor]);


  return (
    <div className="space-y-10">
      {/* === Form Tambah/Edit Notulensi === */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4 max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          {/* {isUpdating ? "Edit Notulensi" : "Tambah Notulensi"} */}
        </h2>

        {/* Pilih Rapat */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Rapat Terkait
          </label>
          <select
            className="w-full border p-2 rounded-md border-gray-300 bg-white"
            value={rapatId ?? ""}
            onChange={(e) =>
              setRapatId(e.target.value ? parseInt(e.target.value) : null)
            }
            required
          >
            <option value="">-- Pilih Rapat --</option>
            {rapatDone.map((r) => (
              <option key={r.id} value={r.id}>
                {r.judul}
              </option>
            ))}
          </select>
        </div>

        {/* Editor Notulensi */}
       <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Isi Notulensi
        </label>
        <textarea
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          rows={8}
          className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tuliskan isi notulensi di sini..."
          required
        />
      </div>

        {/* Upload Dokumen */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dokumen Pendukung
          </label>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full border p-2 rounded-md border-gray-300"
          />
          <p className="text-xs text-gray-500 mt-1">Maks 5MB per file.</p>
        </div>

        {/* Submit */}
        <div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:opacity-50"
            disabled={loading}
          >
            {loading
              ? isUpdating
                ? "Memperbarui..."
                : "Menyimpan..."
              : isUpdating
              ? "Update Notulensi"
              : "Simpan Notulensi"}
          </button>
        </div>
      </form>

      {/* === List Notulensi === */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Daftar Notulensi</h3>

        {notulensiList.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada notulensi.</p>
        ) : (
          notulensiList.map((n) => (
            <div
    key={n.id}
    className="p-4 bg-white rounded shadow border space-y-2"
  >
    {/* Header Notulensi */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
      <div>
        <h4 className="font-semibold text-base">{n.rapat?.judul}</h4>
        <p className="text-sm text-gray-600">
          Dibuat oleh: {n.dibuat_oleh || "-"}
        </p>
        <p className="text-sm text-gray-600">
          Dibuat oleh (Admin): {n.dibuat_oleh_admin || "-"}
        </p>
      </div>

      {/* Tombol Aksi */}
      <div className="flex gap-3">
        <button
          onClick={() => handleEdit(n)}
          className="text-blue-600 text-sm hover:underline"
        >
          Edit
        </button>
      </div>
    </div>

    {/* Isi Notulensi */}
    <div
      className="text-sm text-gray-700 prose prose-sm max-h-[200px] overflow-y-auto"
      dangerouslySetInnerHTML={{ __html: n.isi }}
    />
  </div>
          ))
        )}
      </div>

      {/* Modal Edit (Optional jika tidak inline) */}
      {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-xl font-semibold text-gray-800">Edit Notulensi</h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Editor */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white min-h-[200px]">
            <EditorContent editor={editor} />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Batal
            </button>
            <button
              onClick={() => handleUpdateNotulensi(editId)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
      )}
    </div>

  );
};

export default NotulenRapat;
