"use client";

import { Layout, Compass, BarChart, List } from "lucide-react";
import { SideBarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
]
export const SideBarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  

  return (
    <div className="flex flex-col w-full">
      {routes.map((routes) => (
        <SideBarItem
          key={routes.href}
          icon={routes.icon}
          label={routes.label}
          href={routes.href}
        />
      ))}
    </div>
  );
};
