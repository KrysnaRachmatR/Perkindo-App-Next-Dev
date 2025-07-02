import axios from "axios";
import { API_URL } from "@/utils/constant";

export const loginUser = (credentials) =>
  axios.post(`${API_URL}/login`, credentials);

export const registerUser = (formData) =>
  axios.post(`${API_URL}/register`, formData);
