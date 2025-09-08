import api from "@/services/api";

export const getProfil = async () => {
  const res = await api.get("/profile");
  return res.data;
};

export const postProfil = async (formData) => {
  const res = await api.post("/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateProfil = async (id, formData) => {
  const res = await api.post(`/profile/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteProfil = async (id) => {
  const res = await api.delete(`/profile/${id}`);
  return res.data;
};
