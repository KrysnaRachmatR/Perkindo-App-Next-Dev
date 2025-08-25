import Image from "next/image";
import { X, Calendar, Tag } from "lucide-react";

export default function NewsModal({ news, onClose, formatDate, getCategoryColor }) {
  if (!news) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-red-50 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
          </button>
          
          {/* Category Badge in Header */}
          {news.category && (
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor?.(news.category) || 'bg-gray-100 text-gray-700'}`}
              >
                {news.category}
              </span>
            </div>
          )}
          
          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 leading-tight pr-12">
            {news.title}
          </h2>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6">
          {/* Hero Image */}
          <div className="relative group">
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100">
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                priority
              />
              
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Image Caption/Alt Text */}
            <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center italic">
              {news.title}
            </p>
          </div>

          {/* Content Section */}
          <div className="prose prose-gray max-w-none">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-100">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-0">
                {news.caption}
                </p>
            </div>
            </div>

          {/* Footer Info */}
          <div className="border-t border-gray-100 pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Diterbitkan:</span>
                <span>{formatDate ? formatDate(news.created_at) : news.created_at}</span>
              </div>
              
              {/* Additional Metadata */}
              <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Berita Terbaru
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            {/* <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
              Bagikan Berita
            </button>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105">
              Simpan untuk Nanti
            </button> */}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-6 w-2 h-2 bg-blue-300/30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-8 w-1 h-1 bg-indigo-400/40 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-20 left-8 w-1.5 h-1.5 bg-blue-200/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  );
}