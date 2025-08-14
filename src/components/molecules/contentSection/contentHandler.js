export const sortBeritaByDate = (beritaArray) => {
  if (!Array.isArray(beritaArray)) return [];

  return beritaArray
    .slice() // copy array agar tidak mengubah original
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
};
