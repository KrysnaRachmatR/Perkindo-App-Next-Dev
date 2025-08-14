import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }) => {
  const pathname = usePathname();

  return (
    <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
      {item.map((child, index) => (
        <li key={index}>
          <Link
            href={child.route}
            className={`group relative flex items-center gap-2.5 rounded-sm px-4 font-medium text-black duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 dark:text-white hover:text-white ${
              pathname === child.route ? "text-black" : ""
            }`}
          >
            {child.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarDropdown;
