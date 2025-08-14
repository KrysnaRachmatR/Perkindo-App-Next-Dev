// src/handlers/useDashboardHandler.js
import { useState, useEffect } from "react";
// import { getDashboardSummary } from "@/services/dashboardService";
import { getDashboardSummary } from "./dashboardService";
// import { transformDashboardData } from "@/controllers/dashboardController";
import { transformDashboardData } from "./dashboardController";

export const useDashboardHandler = () => {
  const [loading, setLoading] = useState(false);
  const [totalData, setTotalData] = useState({});
  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });
  const [toast, setToast] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const rawData = await getDashboardSummary();
      const { dataTotal, categories, series } = transformDashboardData(rawData);
      setTotalData(dataTotal);
      setChartData({ categories, series });
    } catch (err) {
      console.error(err);
      setToast({
        message: "Gagal mengambil data.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, totalData, chartData, toast, setToast };
};
