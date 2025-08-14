import axios from "axios";
import { API_URL } from "@/utils/constant";

export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`);
  return response.data.data;
};
