"use client";

import { useEffect, useState } from "react";
import { fetchGaleriMedia } from "./galleryController";

export const useGaleriHandler = () => {
  const [media, setMedia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const loadMedia = async () => {
      const { data, error } = await fetchGaleriMedia();
      if (data) {setMedia(data.data);console.log(data);};
      if (error) console.error(error);
    };

    loadMedia();
  }, []);

  const openModal = (item) => {
    setSelectedMedia(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedia(null);
  };

  return {
    media,
    isModalOpen,
    selectedMedia,
    openModal,
    closeModal,
  };
};
