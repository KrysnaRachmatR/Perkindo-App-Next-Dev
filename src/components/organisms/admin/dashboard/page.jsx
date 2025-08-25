"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useDashboardHandler } from "./dashboardHandler";
import CardDataStats from "./cardData";
import LineChart from "./lineChart";
import Toast from "@/components/atoms/toastAlert";
import { IdCardIcon, FileBox, FileCode2, TrendingUp, Activity, BarChart3 } from "lucide-react";

const DashboardAdmin = () => {
  const DoughnutChart = dynamic(() => import("./DoughnutChart"), {
    ssr: false,
  });

  const { loading, totalData, chartData, toast, setToast } = useDashboardHandler();

  return (
    <div className="space-y-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header Section */}
      <div className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 rounded-2xl blur-3xl" />
        
        {/* Header Content */}
        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                  Dashboard Overview
                </h1>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Monitor your system performance and statistics
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100/80 dark:bg-green-900/30 rounded-xl border border-green-200/60 dark:border-green-800/60">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">System Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative">
              <CardDataStats title="KTA" total={totalData.kta}>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                  <IdCardIcon className="w-8 h-8 text-white" />
                </div>
              </CardDataStats>
            </div>
          </div>
        </div>

        <div className="group">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative">
              <CardDataStats title="SBU KONSTRUKSI" total={totalData.sbus}>
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                  <FileBox className="w-8 h-8 text-white" />
                </div>
              </CardDataStats>
            </div>
          </div>
        </div>

        <div className="group">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative">
              <CardDataStats title="SBU NON KONSTRUKSI" total={totalData.sbun}>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                  <FileCode2 className="w-8 h-8 text-white" />
                </div>
              </CardDataStats>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="space-y-6">
        {/* Chart Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Analytics Overview
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Track your data trends and performance metrics
            </p>
          </div>
        </div>

        {/* Chart Container */}
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl" />
          
          {/* Chart Content */}
          <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl overflow-hidden">
            <div className="p-6">
              {chartData.series.some(series => series.data.some(val => val > 0)) ? (
                <div className="space-y-4">
                  {/* Chart Stats */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-indigo-500" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Live Data</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                        <span className="text-slate-600 dark:text-slate-400">Current Period</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                        <span className="text-slate-600 dark:text-slate-400">Growth</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart */}
                  <LineChart series={chartData.series} categories={chartData.categories} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <BarChart3 className="w-8 h-8 text-slate-400" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                      No Data Available
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                      There's no data to display at the moment. Check back later or ensure your data sources are connected.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;