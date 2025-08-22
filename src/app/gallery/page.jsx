"use client";

import NavbarView from "@/components/organisms/navbar/navbar";
import GaleriSectionOrganism from "@/components/organisms/gallery/gallerySectionOrganisms";
import Footer from "@/components/organisms/footer/footer";
import { BASE_URL } from "@/utils/constant";
import { useGaleriHandler } from "./galleryHandler";

const MainTemplateGaleri = () => {
  const {
    media,
    isModalOpen,
    selectedMedia,
    openModal,
    closeModal,
  } = useGaleriHandler();

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen flex flex-col">
      <NavbarView />
      <GaleriSectionOrganism/>
      
      {/* Main Gallery Section */}
      <div className="container mx-auto px-4 py-12 flex-grow">
        {/* Gallery Grid with Masonry-like Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {media.map((item, index) => (
            <div
              key={item.id}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 break-inside-avoid mb-6 ${
                index % 3 === 0 ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' : 
                index % 3 === 1 ? 'bg-gradient-to-br from-pink-500/10 to-orange-500/10' :
                'bg-gradient-to-br from-green-500/10 to-teal-500/10'
              }`}
              onClick={() => openModal(item)}
            >
              {/* Image with Overlay Effects */}
              <div className="relative overflow-hidden">
                <img
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={`${BASE_URL}/storage/${item.gambar}`}
                  alt={item.judul || "Galeri"}
                  style={{ aspectRatio: 'auto' }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Hover Icons */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Caption Section with Modern Design */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium leading-relaxed line-clamp-3">
                    {item.caption || "Tidak ada caption"}
                  </p>
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <span className="text-white/80 text-xs px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                      Klik untuk detail
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {media.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">Belum ada media</h3>
            <p className="text-slate-500">Galeri kosong, silakan tambahkan media baru.</p>
          </div>
        )}
      </div>

      {/* Enhanced Modal Pop-up */}
      {isModalOpen && selectedMedia && (
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
              <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="w-full lg:w-3/5 relative bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="aspect-w-16 aspect-h-12 lg:aspect-none lg:h-[600px]">
                  <img
                    className="w-full h-full object-cover"
                    src={`${BASE_URL}/storage/${selectedMedia.gambar}`}
                    alt={selectedMedia.judul || "Galeri"}
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-2/5 p-8 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4"></div>
                  <h3 className="text-2xl font-bold text-slate-800">Detail Media</h3>
                </div>
                
                <div className="flex-grow">
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Caption</h4>
                    <div className="bg-slate-50 rounded-xl p-4 max-h-80 overflow-y-auto">
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                        {selectedMedia.caption || "Tidak ada deskripsi tersedia untuk media ini."}
                      </p>
                    </div>
                  </div>

                  {selectedMedia.judul && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Judul</h4>
                      <p className="text-lg font-medium text-slate-800">{selectedMedia.judul}</p>
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
                    onClick={() => window.open(`${BASE_URL}/storage/${selectedMedia.gambar}`, '_blank')}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    Lihat Full
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MainTemplateGaleri;