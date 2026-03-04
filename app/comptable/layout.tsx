"use client";

import ComptableSidebar from "@/components/dashboard/comptable/ComptableSidebar";

export default function ComptableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 font-montserrat">
      {/* Persistent Sidebar */}
      <ComptableSidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-10 space-y-10">
        {children}
      </main>
    </div>
  );
}
