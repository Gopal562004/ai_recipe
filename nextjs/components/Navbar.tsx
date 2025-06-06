"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "../lib/constants";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div
      className="p-2 bg-[#393948] text-white shadow-md fixed  w-full"
      style={{ bottom: "-1px" }}
    >
      <div className="flex justify-around items-center">
        {navigationLinks.map((link) => {
          const isActive = pathname === link.path;

          return (
            <Link
              key={link.label}
              href={link.path}
              className={`flex flex-col items-center gap-1 text-sm transition ${
                isActive ? "text-purple-400" : "text-white"
              }`}
            >
              <link.icon size={24} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
