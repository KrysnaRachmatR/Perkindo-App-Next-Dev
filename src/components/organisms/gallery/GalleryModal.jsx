import { BASE_URL } from "@/utils/constant";

export default function GalleryModal({ selectedMedia, closeModal, handleModalClick }) {
  if (!selectedMedia) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleModalClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl relative transform animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-red-500/20 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 transition-all duration-300 group"
        >
          <svg
            className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="w-full lg:w-3/5 relative bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="aspect-w-16 aspect-h-12 lg:aspect-none lg:h-[600px]">
              <img
                className="w-full h-full object-cover"
                src={`${BASE_URL}/storage/${selectedMedia.gambar}`}
                alt={selectedMedia.judul || "Galeri"}
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-2/5 p-8 flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4"></div>
              <h3 className="text-2xl font-bold text-slate-800">Detail Media</h3>
            </div>

            <div className="flex-grow">
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Caption
                </h4>
                <div className="bg-slate-50 rounded-xl p-4 max-h-80 overflow-y-auto">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {selectedMedia.caption || "Tidak ada deskripsi tersedia untuk media ini."}
                  </p>
                </div>
              </div>

              {selectedMedia.judul && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Judul
                  </h4>
                  <p className="text-lg font-medium text-slate-800">
                    {selectedMedia.judul}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 px-6 rounded-xl font-medium transition-colors duration-300"
              >
                Tutup
              </button>
              <button
                onClick={() => window.open(`${BASE_URL}/storage/${selectedMedia.gambar}`, "_blank")}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              >
                Lihat Full
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
