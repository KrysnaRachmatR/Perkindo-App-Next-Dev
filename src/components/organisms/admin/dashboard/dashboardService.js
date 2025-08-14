import api from "@/services/api";

export const getDashboardSummary = async () => {
  const response = await api.get('/total-summary',{headers: {
    'ngrok-skip-browser-warning' : true
  }});
  return response.data;
};
