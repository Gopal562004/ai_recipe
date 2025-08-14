"use client";

import "../../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const queryClient = new QueryClient();

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="font-poppins min-h-screen flex flex-col md:flex-row">
        <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen md:fixed md:left-0 md:top-0 bg-[#212832] text-white">
          <Sidebar />
        </aside>

        <main className="flex-1 pt-4 pb-16 md:ml-64 md:pt-8 md:pb-0 bg-gray-900">
          {children}
        </main>

        <nav className="fixed bottom-0 left-0 w-full md:hidden bg-gray-800 text-white z-50">
          <Navbar />
        </nav>
      </div>
    </QueryClientProvider>
  );
}
