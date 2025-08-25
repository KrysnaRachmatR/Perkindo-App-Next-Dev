"use client";
import { Bell, Search, Settings, User } from "lucide-react";
// import DropdownUser from "./DropdownUser";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60 shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8 h-18">
        
        {/* Left Section - Sidebar Toggle & Search */}
        <div className="flex items-center gap-4">
          {/* Enhanced Sidebar Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="lg:hidden relative p-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="Toggle Sidebar"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 rounded-full bg-slate-700 dark:bg-slate-200 transform transition-all duration-300 origin-center ${
                  sidebarOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-slate-700 dark:bg-slate-200 transition-all duration-300 ${
                  sidebarOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-slate-700 dark:bg-slate-200 transform transition-all duration-300 origin-center ${
                  sidebarOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>

          {/* Search Bar - Hidden on mobile */}
          {/* <div className="hidden md:flex items-center relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2.5 w-80 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-xl text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all duration-200"
              />
            </div>
          </div> */}
        </div>

        {/* Center Section - Page Title (optional) */}
        <div className="hidden lg:flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
            <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Admin Dashboard
            </h1>
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Search Icon for Mobile */}
          <button className="md:hidden p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-200">
            <Search className="w-4 h-4" />
          </button>

          {/* Notification Bell */}
          {/* <button className="relative p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-200 group">
            <Bell className="w-4 h-4" /> */}
            {/* Notification Badge */}
            {/* <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              3
            </span>
          </button> */}

          {/* Settings */}
          {/* <button className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-200 group">
            <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          </button> */}

          {/* Profile Avatar */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-3 p-1 pr-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 group">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
                {/* Online Status */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Admin User</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Administrator</div>
              </div>
            </button>
          </div>
          
          {/* <DropdownUser /> */}
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-xl text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all duration-200"
          />
        </div>
      </div>

      {/* Subtle gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
    </header>
  );
};

export default Header;