"use client";

import NavbarView from "@/components/organisms/navbar/navbar";
import GaleriSectionOrganism from "@/components/organisms/gallery/gallerySectionOrganisms";
import Footer from "@/components/organisms/footer/footer";
import { useGaleriHandler } from "./galleryHandler";
import GalleryGrid from "@/components/organisms/gallery/GalleryGrid";
import GalleryEmptyState from "@/components/organisms/gallery/GalleryEmptyState";
import GalleryModal from "@/components/organisms/gallery/GalleryModal";

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
