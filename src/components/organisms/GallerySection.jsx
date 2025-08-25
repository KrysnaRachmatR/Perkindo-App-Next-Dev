"use client";

import GalleryCard from "../molecules/GalleryCard";
import { useGaleriHandler } from "@/app/gallery/galleryHandler";
import { BASE_URL } from "@/utils/constant";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function GallerySection() {
  const { media, openModal, isModalOpen, selectedMedia, closeModal } =
    useGaleriHandler();
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update current index when selectedMedia changes
  useEffect(() => {
    if (selectedMedia && media.length > 0) {
      const index = media.findIndex(item => item.id === selectedMedia.id);
      setCurrentIndex(index >= 0 ? index : 0);
    }
  }, [selectedMedia, media]);

  const navigateImage = (direction) => {
    if (media.length === 0) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = currentIndex === media.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? media.length - 1 : currentIndex - 1;
    }
    
    setCurrentIndex(newIndex);
    openModal(media[newIndex]);
  };

  const handleKeyPress = (e) => {
    if (!isModalOpen) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      navigateImage('next');
    } else if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen, currentIndex]);

  return (
    <section className="min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-blue-800 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
            Galeri Proyek
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Showcase dari berbagai proyek dan kegiatan yang telah kami laksanakan dengan dedikasi tinggi
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {media.length > 0 ? (
            media.map((item, index) => (
              <div
                key={item.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                onClick={() => openModal(item)}
              >
                <GalleryCard
                  imageSrc={`${BASE_URL}/storage/${item.gambar}`}
                  title={item.judul}
                  caption={item.caption}
                  onClick={() => openModal(item)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-20 md:py-24">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg sm:text-xl font-medium">Tidak ada data galeri</p>
              <p className="text-gray-400 text-sm sm:text-base mt-2">Galeri akan segera diperbarui</p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && selectedMedia && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
          onClick={closeModal}
        >
          {/* Modal Container */}
          <div
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[95vh] overflow-hidden relative transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>

            {/* Navigation Buttons */}
            {media.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </button>
              </>
            )}

            {/* Image Container */}
            <div className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl bg-gray-100">
              <img
                src={`${BASE_URL}/storage/${selectedMedia.gambar}`}
                alt={selectedMedia.judul}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] object-cover transition-all duration-300"
                loading="lazy"
              />
              
              {/* Image Counter */}
              {media.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentIndex + 1} / {media.length}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                {selectedMedia.judul}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                {selectedMedia.caption}
              </p>
              
              {/* Additional Info */}
              <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-4 border-t border-gray-100">
                <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                  Proyek #{selectedMedia.id}
                </span>
                {media.length > 1 && (
                  <span className="text-xs sm:text-sm text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full">
                    {currentIndex + 1} dari {media.length} gambar
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}