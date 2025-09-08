import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ items }) => {
  const pathname = usePathname();

  return (
    <ul className="mb-5.5 mt-2 flex flex-col gap-1 pl-6">
      {items.map((child, index) => {
        const isActive = pathname === child.route;
        return (
          <li key={index}>
            <Link
              href={child.route}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium duration-200 
                ${isActive ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white" : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"}`}
            >
              {child.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarDropdown;
