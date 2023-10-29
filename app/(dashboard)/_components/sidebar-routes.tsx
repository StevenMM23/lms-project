"use client";

import { Layout, Compass, BarChart, List } from "lucide-react";
import { SideBarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

// Se define cuales son las rutas de una persona que va a ver cursos (Invitado)
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

// Se define cuales son las rutas que va a tener un profesor (Una persona que va a subir videos)
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
  
  //Toma usa usePathName para leer la ruta URL y obtener valores
  const pathname = usePathname();

  //Verifica si en la URL se include la palabra /teacher, eso significa que estamos en la pestaña profesor
  const isTeacherPage = pathname?.includes("/teacher");

  //En caso de que si se este en la pestaña profesor, el va a coger y renderizar las rutas que se tenga en TeacherRoutes
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
