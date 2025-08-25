import api from "@/services/api";

export const getNews = async () => {
  const response = await api.get("/berita");
  return response.data;
};

