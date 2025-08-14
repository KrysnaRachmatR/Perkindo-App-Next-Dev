"use client";

import { useState, useEffect, useRef } from "react";
// import { fetchCardData } from "./CardService";
import { fetchCardData } from "./cardService";
// import { handleNext, handlePrev } from "./CardHandler";
import { handleNext, handlePrev } from "./cardHandler";
import CardView from "./CardView";

const CardController = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await fetchCardData();
        setCards(data);
      } catch (error) {
        console.error("Error loading cards:", error);
      }
    };

    loadCards();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const onNext = () => {
    setCurrentIndex((prev) => handleNext(prev, cards.length));
  };

  const onPrev = () => {
    setCurrentIndex((prev) => handlePrev(prev));
  };

  const openModal = (card) => {
    setModalContent(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  return (
    <CardView
      cards={cards}
      currentIndex={currentIndex}
      onNext={onNext}
      onPrev={onPrev}
      containerRef={containerRef}
      isModalOpen={isModalOpen}
      modalContent={modalContent}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};

export default CardController;
