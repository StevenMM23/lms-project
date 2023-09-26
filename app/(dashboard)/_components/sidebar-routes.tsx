"use client";

import { Layout, Compass } from "lucide-react";
import { SideBarItem } from "./sidebar-item";

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

export const SideBarRoutes = () => {
  const routes = guestRoutes;

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
