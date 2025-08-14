import axios from "axios";
// import { API_URL } from "./config"; // Pastikan API_URL diimpor dengan benar
import { API_URL } from "@/utils/constant";

export const fetchCardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/galeri`, {
      headers: {
        'ngrok-skip-browser-warning': 'true' // Pastikan ini adalah string
      }
    });

    const data = response?.data?.data;

    if (!Array.isArray(data)) {
      console.warn("fetchCardData: data is not an array", data);
      return [];
    }

    return data.map((item) => ({
      id: item.id,
      imageSrc: `http://localhost:8000/storage/${item.gambar}`, // Ganti dengan domain production jika dihosting
      title: item.judul,
      caption: item.caption,
    }));
  } catch (error) {
    console.error("Error fetching card data:", error);
    return [];
  }
};
