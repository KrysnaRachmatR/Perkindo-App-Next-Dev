"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useDashboardHandler } from "./dashboardHandler";
import CardDataStats from "./cardData";
import LineChart from "./lineChart";
import Toast from "@/components/atoms/toastAlert";
import { IdCardIcon, FileBox, FileCode2 } from "lucide-react";

const DashboardAdmin = () => {
  const DoughnutChart = dynamic(() => import("./DoughnutChart"), {
    ssr: false,
  });

  const { loading, totalData, chartData, toast, setToast } = useDashboardHandler();

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 gap-y-6 gap-x-6 w-full">
        <CardDataStats title="KTA" total={totalData.kta}>
          <IdCardIcon className="w-8 h-8" />
        </CardDataStats>
        <CardDataStats title="SBU KONSTRUKSI" total={totalData.sbus}>
          <FileBox className="w-8 h-8" />
        </CardDataStats>
        <CardDataStats title="SBU NON KONSTRUKSI" total={totalData.sbun}>
          <FileCode2 className="w-8 h-8" />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-1">
        <div className="h-full">
          {chartData.series.some(series => series.data.some(val => val > 0)) ? (
            <LineChart series={chartData.series} categories={chartData.categories} />
          ) : (
            <p>Tidak ada data untuk ditampilkan.</p>
          )}
        </div>

        {/* <div className="h-full">
          <DoughnutChart />
        </div> */}
      </div>
    </>
  );
};

export default DashboardAdmin;
