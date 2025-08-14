import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const SidebarItem = ({ item, pageName, setPageName }) => {
  const pathname = usePathname();

  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
    setPageName(updatedPageName);
  };

  const isActive = (item) => {
    if (item.route === pathname) return true;
    if (item.children) {
      return item.children.some((child) => isActive(child));
    }
    return false;
  };

  const isItemActive = isActive(item);

  return (
    <li>
      {/* Jika ada children: tampilkan parent-nya sebagai teks non-clickable */}
      {item.children ? (
        <div className="px-4 py-2 font-medium text-gray-500">
          <div className="flex items-center gap-2.5">
            {item.icon}
            {item.label}
            <ChevronDown className="ml-auto w-4 h-4" />
          </div>
          <ul className="mt-2 ml-6 space-y-1 border-l border-graydark pl-2">
            {item.children.map((child, idx) => {
              const isChildActive = pathname === child.route;
              return (
                <li key={idx}>
                  <Link
                    href={child.route}
                    onClick={() => setPageName(child.label.toLowerCase())}
                    className={`flex items-center gap-2.5 rounded px-3 py-1.5 text-sm transition-all ${
                      isChildActive
                        ? "bg-graydark dark:bg-meta-4 text-white"
                        : "text-black dark:text-white hover:bg-graydark dark:hover:bg-meta-4 hover:text-white"
                    }`}
                  >
                    {child.icon}
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        // Jika tidak ada children: tampilkan sebagai menu biasa
        <Link
          href={item.route}
          onClick={handleClick}
          className={`group relative flex items-center gap-2.5 rounded px-4 py-2 font-medium transition ${
            isItemActive
              ? "bg-graydark dark:bg-meta-4 text-white"
              : "text-black dark:text-white hover:bg-graydark dark:hover:bg-meta-4 hover:text-white"
          }`}
        >
          {item.icon}
          {item.label}
        </Link>
      )}
    </li>
  );
};

export default SidebarItem;
