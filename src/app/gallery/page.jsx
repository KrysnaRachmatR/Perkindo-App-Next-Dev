"use client";

import NavbarView from "@/components/organisms/Navbar/Navbar";
import GaleriSectionOrganism from "@/components/organisms/Gallery/GallerySectionOrganisms";
import Footer from "@/components/organisms/Footer/Footer";
import { useGaleriHandler } from "./galleryHandler";
import GalleryGrid from "@/components/organisms/Gallery/GalleryGrid";
import GalleryEmptyState from "@/components/organisms/Gallery/GalleryEmptyState";
import GalleryModal from "@/components/organisms/Gallery/GalleryModal";

const MainTemplateGaleri = () => {
  const { media, isModalOpen, selectedMedia, openModal, closeModal } =
    useGaleriHandler();

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen flex flex-col">
      <NavbarView />
      <GaleriSectionOrganism />

      <div className="container mx-auto px-4 py-12 flex-grow">
        {media.length > 0 ? (
          <GalleryGrid media={media} openModal={openModal} />
        ) : (
          <GalleryEmptyState />
        )}
      </div>

      {isModalOpen && selectedMedia && (
        <GalleryModal
          selectedMedia={selectedMedia}
          closeModal={closeModal}
          handleModalClick={handleModalClick}
        />
      )}

      <Footer />
    </div>
  );
};

export default MainTemplateGaleri;
