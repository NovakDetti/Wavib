"use client";

import { Navbar } from "@/components/Navbar";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-16">
        <DashboardSidebar />
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
