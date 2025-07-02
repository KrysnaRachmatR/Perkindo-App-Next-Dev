export const sortBeritaByDate = (beritaArray) => {
  return beritaArray.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );
};
