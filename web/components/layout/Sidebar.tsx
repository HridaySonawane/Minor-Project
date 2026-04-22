"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathParts = pathname.split("/").filter(Boolean);
  const roleFromPath =
    pathParts[0] === "dashboard" && pathParts[1] ? pathParts[1] : null;
  const role = roleFromPath || searchParams.get("role") || "worker";

  const menuMap: Record<string, Array<{ name: string; path: string }>> = {
    worker: [
      { name: "Dashboard", path: "/dashboard/worker" },
      { name: "Report Incident", path: "/dashboard/worker/incidents/report" },
      { name: "Check In/Out", path: "/dashboard/worker/attendance" },
      { name: "Tasks", path: "/dashboard/worker/tasks" },
      { name: "Alerts", path: "/dashboard/worker/alerts" },
    ],
    supervisor: [
      { name: "Dashboard", path: "/dashboard/supervisor" },
      { name: "Team", path: "/dashboard/supervisor/team" },
      { name: "Tasks", path: "/dashboard/supervisor/tasks" },
      { name: "Incidents", path: "/dashboard/supervisor/incidents" },
      { name: "Alerts", path: "/dashboard/supervisor/alerts" },
    ],
    safety: [
      { name: "Dashboard", path: "/dashboard/safety" },
      { name: "Safety Monitoring", path: "/dashboard/safety/monitoring" },
      { name: "Alerts", path: "/dashboard/safety/alerts" },
      { name: "Incident Review", path: "/dashboard/safety/incidents/review" },
      { name: "Settings", path: "/dashboard/safety/settings" },
    ],
    admin: [
      { name: "Dashboard", path: "/dashboard/admin" },
      { name: "Users", path: "/dashboard/admin/users" },
      { name: "Roles", path: "/dashboard/admin/roles" },
      { name: "Logs", path: "/dashboard/admin/logs" },
      { name: "Settings", path: "/dashboard/admin/settings" },
    ],
    authority: [
      { name: "Dashboard", path: "/dashboard/authority" },
      { name: "Analytics", path: "/dashboard/authority/analytics" },
      { name: "Reports", path: "/dashboard/authority/reports" },
      { name: "User Control", path: "/dashboard/authority/users" },
      { name: "System Control", path: "/dashboard/authority/system" },
      { name: "Global Alerts", path: "/dashboard/authority/alerts" },
    ],
  };

  const menu = menuMap[role] || menuMap.worker;

  return (
    <div className="w-64 bg-neutral-900 p-4 border-r border-neutral-800 overflow-y-auto h-screen">
      <Link href="/">
        <h2 className="text-xl font-bold mb-6 hover:text-orange-400 transition">
          MineOps
        </h2>
      </Link>

      <div className="mb-4 p-2 bg-neutral-800 rounded-lg text-xs text-gray-400">
        Role: <span className="capitalize text-orange-400">{role}</span>
      </div>

      <div className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="block p-3 rounded-lg hover:bg-neutral-800 transition text-sm"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
