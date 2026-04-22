import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const roleScopedRoutes = new Set([
  "tasks",
  "attendance",
  "alerts",
  "team",
  "incidents",
  "users",
  "roles",
  "logs",
  "settings",
  "monitoring",
  "analytics",
  "reports",
  "system",
]);

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] !== "dashboard" || parts.length < 3) {
    return NextResponse.next();
  }

  const role = parts[1];
  const slug = parts.slice(2);
  const first = slug[0];
  let destinationPath: string | null = null;

  if (first === "incidents" && slug[1] === "report") {
    destinationPath = "/incidents/report";
  } else if (first === "incidents" && slug[1] === "review") {
    destinationPath = "/incidents/review";
  } else if (first === "incidents" && slug[1]) {
    destinationPath = `/incidents/${slug[1]}`;
  } else if (roleScopedRoutes.has(first)) {
    destinationPath = `/${first}`;
  }

  if (!destinationPath) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = destinationPath;
  url.search = search;
  url.searchParams.set("role", role);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
