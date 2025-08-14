"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
// import ClickOutside from "./ClickOutside"; // Uncomment kalau file tersedia

import {
  LayoutDashboard,
  CheckCircle,
  FileCheck,
  Hammer,
  Layers,
  User,
  Banknote,
  Home,
  CalendarDays,
  ImageIcon,
  IdCard,
  Newspaper,
  Headset,
  LogOutIcon,
} from "lucide-react";

const menuGroups = [
  {
    name: "DATA",
    menuItems: [
      {
        icon: <LayoutDashboard className="w-5 h-5" />,
        label: "Dashboard",
        route: "/user",
      },
      {
        icon: <CheckCircle className="w-5 h-5" />,
        label: "Pendaftaran KTA",
        route: "/admin/anggota/validasi-reg/reg-kta",
      },
      {
        icon: <FileCheck className="w-5 h-5" />,
        label: "Pendaftaran SBU",
        route: "#",
        children: [
          {
            label: "Konstruksi",
            route: "/admin/anggota/validasi-reg/reg-sbu-konstruksi",
          },
          {
            label: "Non-Konstruksi",
            route: "/admin/anggota/validasi-reg/reg-sbu-non-konstruksi",
          },
        ],
      },
      {
            icon: <Hammer className="w-5 h-5" />,
            label: "Rapat",
            route: "/user/rapat",
      },
    ],
  },
  {
    name: "Segera Tayang",
    menuItems: [
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [pageName, setPageName] = useState("dashboard");

  useEffect(() => {
  const storedPage = localStorage.getItem("selectedMenu");
  if (storedPage) setPageName(storedPage);
}, []);

useEffect(() => {
  if (pageName) localStorage.setItem("selectedMenu", pageName);
}, [pageName]);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.pathname = "/";
  };

  const AsideWrapper = ({ children }) => {
    // Ganti ClickOutside dengan wrapper div kalau tidak tersedia
    return <div onClick={() => setSidebarOpen(false)}>{children}</div>;
  };

  return (
    <AsideWrapper>
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 flex flex-col bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo & Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center gap-3">
            <Image
              width={40}
              height={40}
              src="/images/logo.png"
              alt="Logo"
              priority
              className="object-contain"
            />
            <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
              PERKINDO
            </span>
            <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
              KALBAR
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 dark:text-gray-300 hover:text-rose-500 transition"
            aria-label="Close Sidebar"
          >
            <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 00-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-5 py-6 no-scrollbar">
          <nav className="flex flex-col gap-8">
            {menuGroups.map((group, index) => (
              <div key={index}>
                <h4 className="mb-2 ml-2 text-xs font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                  {group.name}
                </h4>
                <ul className="space-y-1">
                  {group.menuItems.map((item, idx) => (
                    <SidebarItem
                      key={idx}
                      item={item}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
                {index < menuGroups.length - 1 && (
                  <hr className="mt-5 border-t border-gray-200 dark:border-gray-700" />
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white dark:bg-gray-800 border px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-700 hover:shadow-md transition"
          >
            <LogOutIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </AsideWrapper>
  );
};

export default Sidebar;
