export const handleNext = (currentIndex, cardsLength) => {
  return currentIndex < cardsLength - 1 ? currentIndex + 1 : currentIndex;
};

export const handlePrev = (currentIndex) => {
  return currentIndex > 0 ? currentIndex - 1 : currentIndex;
};
