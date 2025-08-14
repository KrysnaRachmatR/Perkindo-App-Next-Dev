import axios from "axios";
import { API_URL } from "@/utils/constant";

export const fetchBerita = async () => {
  try {
    const response = await axios.get(`${API_URL}/berita`, {
      headers: {
        'ngrok-skip-browser-warning': 'true' // harus string
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching berita:", error);
    return null;
  }
};
