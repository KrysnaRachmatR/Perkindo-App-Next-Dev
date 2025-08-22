import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Custom Icons for Navigation
const ChevronLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const CardView = ({
  cards,
  currentIndex,
  onNext,
  onPrev,
  containerRef,
  isModalOpen,
  modalContent,
  openModal,
  closeModal,
}) => {
  return (
    <div className="relative flex items-center justify-center w-full py-8">
      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={onPrev}
          className="absolute left-2 sm:left-4 z-20 w-12 h-12 bg-white/90 backdrop-blur-lg hover:bg-white shadow-xl hover:shadow-2xl rounded-full flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 border border-gray-200"
        >
          <ChevronLeftIcon />
        </button>
      )}

      {/* Cards Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto w-full max-w-[1200px] px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex gap-6 pb-4">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-full max-w-[350px] group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Card */}
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                {/* Image Container */}
                <div className="relative w-full h-[280px] overflow-hidden">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {card.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm leading-relaxed min-h-[3rem]">
                    {card.caption.length > 80
                      ? card.caption.substring(0, 80) + "..."
                      : card.caption}
                  </p>
                  
                  {/* Action Button */}
                  <div className="pt-2">
                    <button
                      className="group/btn w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      onClick={() => openModal(card)}
                    >
                      Selengkapnya
                      <ArrowRightIcon className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {currentIndex < cards.length - 1 && (
        <button
          onClick={onNext}
          className="absolute right-2 sm:right-4 z-20 w-12 h-12 bg-white/90 backdrop-blur-lg hover:bg-white shadow-xl hover:shadow-2xl rounded-full flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 border border-gray-200"
        >
          <ChevronRightIcon />
        </button>
      )}

      {/* Enhanced Modal */}
      <AnimatePresence>
        {isModalOpen && modalContent && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl max-w-[95%] sm:max-w-[900px] w-full max-h-[90vh] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <button
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:text-white transition-all duration-200 transform hover:scale-110"
                  onClick={closeModal}
                >
                  <CloseIcon />
                </button>
                <h2 className="text-2xl font-bold text-white pr-12">
                  Detail Proyek
                </h2>
                <p className="text-blue-100 mt-1">
                  Informasi lengkap tentang proyek
                </p>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Image Section */}
                  <div className="w-full lg:w-3/5">
                    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={modalContent.imageSrc}
                        alt={modalContent.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full lg:w-2/5 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        {modalContent.title}
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-4"></div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-6 border border-blue-100">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Deskripsi Proyek
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {modalContent.caption}
                      </p>
                    </div>

                    {/* Additional Info Cards */}
                    <div className="space-y-4">
                      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <h5 className="font-medium text-gray-800 mb-2">Status Proyek</h5>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <h5 className="font-medium text-gray-800 mb-2">Kategori</h5>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          Konstruksi
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      <button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        onClick={closeModal}
                      >
                        Tutup Detail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardView;