import axios from "axios";
// import { API_URL } from "@/hooks/ApiConfig";
import { API_URL } from "@/utils/constant";

// Set token ke header default
export const setAuthToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

// Ambil SBU pending
export const fetchSbUsPending = async () => {
  return axios.get(`${API_URL}/sbus/pending`);
};

// Ambil SBU aktif
export const fetchSbUsActive = async () => {
  return axios.get(`${API_URL}/sbus/active`);
};

// Update status approve/reject
export const updateSbuStatus = async (id, data) => {
  return axios.put(`${API_URL}/sbus/${id}/status`, data);
};

// Download SBU file
export const downloadSbu = async (registrationId) => {
  return axios.get(`${API_URL}/sbus/download/${registrationId}`, {
    responseType: "blob",
  });
};
