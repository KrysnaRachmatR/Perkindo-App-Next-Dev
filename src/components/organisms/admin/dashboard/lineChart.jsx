import React from "react";
import dynamic from "next/dynamic";

// Import secara dinamis agar hanya di-render di browser
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = ({ series, categories }) => {
  const options = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    xaxis: {
      categories,
    },
    yaxis: {
      title: { text: "Jumlah" },
    },
    legend: {
      position: "top",
    },
  };

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray p-4">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineChart;
