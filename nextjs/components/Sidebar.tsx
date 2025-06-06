"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigationLinks } from "../lib/constants";

export default function Sidebar() {
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  // Optionally, filter navigation links to show only logged-in links
  // For example, only show profile link if token exists
  const filteredLinks = navigationLinks.filter((link) => {
    if (link.path === "/profile") {
      return !!token; // Only show profile if logged in
    }
    return true; // Show other links always
  });

  return (
    <aside className="w-64 min-h-screen p-4 bg-[#1f1f2e] text-white shadow-md fixed top-0 left-0 hidden md:block">
      <h1 className="text-xl font-bold mb-6">Recipe App</h1>

      <nav className="flex flex-col gap-4">
        {filteredLinks.map(({ label, path, icon: Icon }) => {
          const isActive = pathname === path;
          // If you want to pass token as a query param (not recommended, but possible):
          const href =
            path === "/profile" && token ? `${path}/${token}` : path;

          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
