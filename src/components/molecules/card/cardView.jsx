import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="relative flex items-center justify-center w-full">
      {currentIndex > 0 && (
        <button onClick={onPrev} className="absolute left-2 sm:left-4 ...">
          ⬅
        </button>
      )}

      <div
        ref={containerRef}
        className="overflow-x-auto w-full max-w-[1100px] ..."
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {cards.map((card, index) => (
          <div key={index} className="flex-shrink-0 w-full max-w-[350px] ...">
            <div className="relative w-full h-[400px] flex items-center justify-center">
              <Image
                src={card.imageSrc}
                alt={card.title}
                fill
                className="object-contain max-h-full rounded-lg"
                unoptimized
              />
            </div>
            <div className="pt-[20px] pb-4 px-4">
              <h2 className="text-base sm:text-lg font-bold mb-2">
                {card.title}
              </h2>
              <p className="text-gray-200 text-sm sm:text-base mb-4">
                {card.caption.length > 50
                  ? card.caption.substring(0, 50) + "..."
                  : card.caption}
              </p>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-white text-[#161D6F] px-4 py-1 rounded-md ..."
                  onClick={() => openModal(card)}
                >
                  Selengkapnya
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentIndex < cards.length - 1 && (
        <button onClick={onNext} className="absolute right-2 sm:right-4 ...">
          ➡
        </button>
      )}

      {/* Modal */}
      <AnimatePresence>
  {isModalOpen && modalContent && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-[95%] sm:max-w-[800px] w-full dark:bg-boxdark"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-white text-3xl"
          onClick={closeModal}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold text-center mb-4 dark:text-white">
          Detail Gambar
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:w-[60%] h-[250px] sm:h-[400px]">
            <Image
              src={modalContent.imageSrc}
              alt={modalContent.title}
              fill
              className="object-contain rounded-lg"
              unoptimized
            />
          </div>
          <p className="w-full sm:w-1/2 text-gray-600 dark:text-gray-300 text-center sm:text-left">
            {modalContent.caption}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default CardView;
