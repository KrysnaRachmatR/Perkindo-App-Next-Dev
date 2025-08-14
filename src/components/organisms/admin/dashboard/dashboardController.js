export const transformDashboardData = (rawData) => {
  const dataTotal = rawData.total_aktif;
  const dataChart = rawData.chart.yearly;

  const categories = dataChart.map(item => item.month);
  const series = [
    {
      name: "KTA",
      data: dataChart.map(item => item.kta),
    },
    {
      name: "SBU Konstruksi",
      data: dataChart.map(item => item.sbus),
    },
    {
      name: "SBU Non-Konstruksi",
      data: dataChart.map(item => item.sbun),
    },
  ];

  return { dataTotal, categories, series };
};
