import axios from "axios";
import { API_URL } from "@/utils/constant";

export const fetchBerita = async () => {
  const response = await axios.get(`${API_URL}/berita`);
  return response.data;
};
