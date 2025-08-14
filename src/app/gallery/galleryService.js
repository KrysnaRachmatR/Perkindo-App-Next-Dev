import { API_URL } from "@/utils/constant";
import axios from "axios";

export const getGaleriMedia = async () => {
  const response = await axios.get(`${API_URL}/galeri`);
  return response.data; // Ambil langsung array data
};
