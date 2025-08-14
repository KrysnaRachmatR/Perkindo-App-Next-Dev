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
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <NavbarView />
      <GaleriSectionOrganism/>
      <div className="container mx-auto px-4 py-10 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer rounded overflow-hidden shadow-md hover:shadow-xl transition"
              onClick={() => openModal(item)}
            >
              <img
                className="w-full h-64 object-cover"
                src={`${BASE_URL}/storage/${item.gambar}`}
                alt={item.judul || "Galeri"}
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-2">
                <p className="text-white text-sm font-medium truncate">
                  {item.caption || "Tidak ada caption"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Pop-up */}
      {isModalOpen && selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={handleModalClick}
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-red-600 z-10"
            >
              &times;
            </button>

            <div className="flex flex-col md:flex-row gap-6 p-6">
              <div className="w-full md:w-1/2">
                <img
                  className="w-full rounded object-cover"
                  src={`${BASE_URL}/storage/${selectedMedia.gambar}`}
                  alt={selectedMedia.judul || "Galeri"}
                />
              </div>
              <div className="w-full md:w-1/2 max-h-[60vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-2">Caption</h3>
                <p className="text-gray-700 text-sm whitespace-pre-line">
                  {selectedMedia.caption || "Tidak ada deskripsi."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MainTemplateGaleri;
