import { getGaleriMedia } from "./galleryService";

export const fetchGaleriMedia = async () => {
  try {
    const data = await getGaleriMedia();
    return { data };
  } catch (error) {
    return { error: "Gagal mengambil data galeri." };
  }
};
