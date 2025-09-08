import api from "@/services/api";

export const fetchPendingKTAs = async () => {
  const response = await api.get("/kta/all-pending");
  return response.data.data || [];
};

export const fetchActiveKTAs = async () => {
  const response = await api.get("/kta");
  return response.data.data || [];
};

export const approveKTA = async (id, no_kta) => {
  return api.put(`/kta/approve/${id}`, {
    status_diterima: "approve",
    no_kta,
  });
};

export const rejectKTA = async (id, komentar) => {
  return api.put(`/kta/approve/${id}`, {
    status_diterima: "rejected",
    komentar,
  });
};

export const downloadKTA = async (userId) => {
  return api.get(`/kta/download/${userId}`, {
    responseType: "blob",
  });
};
