import { BASE_URL } from "@/utils/constant";
import { getNews } from "./service";

export const fetchNews = async () => {
  try {
    const data = await getNews();

    // pastikan image path jadi absolute url
    const formatted = data.map((item) => ({
      ...item,
      image: item.image.startsWith("http")
        ? item.image
        : `${BASE_URL}/storage/${item.image}`, // 🔥 tambahkan /storage kalau perlu
    }));

    return { data: formatted, error: null };
  } catch (err) {
    return { data: [], error: err.message || "Gagal memuat berita" };
  }
};
