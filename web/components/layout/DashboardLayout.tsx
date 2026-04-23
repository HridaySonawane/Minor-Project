/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }: any) {
  return (
    <div className="flex h-screen bg-neutral-950 text-white">
      <Suspense
        fallback={
          <div className="w-64 bg-neutral-900 border-r border-neutral-800" />
        }
      >
        <Sidebar />
      </Suspense>

      <div className="flex-1 flex flex-col">
        <Suspense
          fallback={
            <div className="h-16 bg-neutral-900 border-b border-neutral-800" />
          }
        >
          <Navbar />
        </Suspense>

        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
