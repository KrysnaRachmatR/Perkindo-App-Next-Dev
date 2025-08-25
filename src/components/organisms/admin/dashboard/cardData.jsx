import React from "react";

const CardDataStats = ({ title, total, children, trend, trendValue, color = "blue" }) => {
  // Color variants for different card types
  const colorVariants = {
    blue: {
      iconBg: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      accent: "border-l-blue-500",
      gradient: "from-blue-500/5 to-blue-600/5"
    },
    indigo: {
      iconBg: "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      accent: "border-l-indigo-500",
      gradient: "from-indigo-500/5 to-indigo-600/5"
    },
    green: {
      iconBg: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      accent: "border-l-emerald-500",
      gradient: "from-emerald-500/5 to-emerald-600/5"
    },
    purple: {
      iconBg: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      accent: "border-l-purple-500",
      gradient: "from-purple-500/5 to-purple-600/5"
    },
    orange: {
      iconBg: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
      iconColor: "text-orange-600 dark:text-orange-400",
      accent: "border-l-orange-500",
      gradient: "from-orange-500/5 to-orange-600/5"
    }
  };

  const currentColor = colorVariants[color] || colorVariants.blue;

  return (
    <div className={`
      relative overflow-hidden
      rounded-xl border border-slate-200/60 dark:border-slate-700/60 
      bg-white/80 dark:bg-slate-900/80 
      backdrop-blur-sm
      shadow-sm hover:shadow-md
      transition-all duration-300 ease-out
      hover:transform hover:scale-[1.02]
      border-l-4 ${currentColor.accent}
      group
    `}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentColor.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative px-6 py-5">
        <div className="flex items-start justify-between">
          {/* Left side - Icon */}
          <div className={`
            flex h-14 w-14 items-center justify-center 
            rounded-xl ${currentColor.iconBg} 
            ${currentColor.iconColor}
            shadow-sm
            transition-transform duration-300 group-hover:scale-110
          `}>
            <div className="text-xl">
              {children}
            </div>
          </div>

          {/* Right side - Stats */}
          <div className="flex flex-col items-end">
            {/* Trend indicator */}
            {trend && trendValue && (
              <div className={`
                flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-2
                ${trend === 'up' 
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' 
                  : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                }
              `}>
                <svg 
                  className={`w-3 h-3 ${trend === 'up' ? 'rotate-0' : 'rotate-180'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                {trendValue}
              </div>
            )}
            
            {/* Total value */}
            <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1 transition-colors">
              {total}
            </h4>
            
            {/* Title */}
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 text-right transition-colors">
              {title}
            </span>
          </div>
        </div>
      </div>

      {/* Subtle bottom border for extra depth */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />
    </div>
  );
};

export default CardDataStats;