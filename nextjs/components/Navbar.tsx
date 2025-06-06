"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigationLinks } from "../lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  const filteredLinks = navigationLinks.filter((link) => {
    if (link.path === "/profile") {
      return !!token;
    }
    return true;
  });

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#393948] text-white shadow-md p-2 z-50 md:hidden">
      <div className="flex justify-around items-center">
        {filteredLinks.map(({ label, path, icon: Icon }) => {
          const isActive = pathname === path;
          const href = path === "/profile" && token ? `${path}/${token}` : path;

          return (
            <Link
              key={label}
              href={href}
              className={`flex flex-col items-center gap-1 text-sm transition ${
                isActive ? "text-purple-400" : "text-white"
              }`}
            >
              <Icon size={24} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
