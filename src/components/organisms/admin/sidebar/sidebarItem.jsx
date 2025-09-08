import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const SidebarItem = ({ item, pageName, setPageName, currentPath }) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (item.children) {
      setIsExpanded((prev) => !prev);
    } else {
      setPageName(item.label.toLowerCase());
    }
  };

  const isActive = (menu) => {
    if (menu.route === pathname) return true;
    if (menu.children) {
      return menu.children.some((child) => pathname === child.route);
    }
    return false;
  };

  const isItemActive = isActive(item);

  // Auto expand jika salah satu child aktif
  useEffect(() => {
    if (item.children && item.children.some((child) => pathname === child.route)) {
      setIsExpanded(true);
    }
  }, [pathname, item.children]);

  return (
    <li>
      {/* Parent dengan dropdown */}
      {item.children ? (
        <div className="space-y-1">
          <button
            onClick={handleClick}
            className={`group relative flex items-center justify-between w-full rounded-xl px-4 py-3 font-medium transition-all duration-200 hover:shadow-sm ${
              isItemActive
                ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-400/20 dark:to-indigo-400/20 text-blue-700 dark:text-blue-300 shadow-sm border-l-4 border-blue-500"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                  isItemActive
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-600"
                }`}
              >
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transform transition-transform duration-200 ${
                isExpanded ? "rotate-180" : "rotate-0"
              } ${
                isItemActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-400"
              }`}
            />
          </button>

          {/* Dropdown children */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="ml-6 space-y-1 border-l-2 border-slate-200 dark:border-slate-700 pl-4 py-2">
              {item.children.map((child, idx) => {
                const isChildActive = pathname === child.route;
                return (
                  <li key={idx}>
                    <Link
                      href={child.route}
                      onClick={() => setPageName(child.label.toLowerCase())}
                      className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm ${
                        isChildActive
                          ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-400/20 dark:to-purple-400/20 text-indigo-700 dark:text-indigo-300 shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isChildActive
                            ? "bg-indigo-500 dark:bg-indigo-400"
                            : "bg-slate-300 dark:bg-slate-600 group-hover:bg-slate-400 dark:group-hover:bg-slate-500"
                        }`}
                      ></div>
                      <span>{child.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        // Menu tanpa children
        <Link
          href={item.route}
          onClick={handleClick}
          className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 hover:shadow-sm ${
            isItemActive
              ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-400/20 dark:to-indigo-400/20 text-blue-700 dark:text-blue-300 shadow-sm border-l-4 border-blue-500"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100"
          }`}
        >
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
              isItemActive
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-600"
            }`}
          >
            {item.icon}
          </div>
          <span>{item.label}</span>

          {/* indicator bulat aktif */}
          {isItemActive && (
            <div className="absolute right-3 w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
          )}
        </Link>
      )}
    </li>
  );
};

export default SidebarItem;
