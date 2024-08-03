"use client";
import { SidebarItem } from "./sidebar-item";
import { Backpack, LayoutDashboard } from "lucide-react";

const guestRoutes = [
  {
   icon: LayoutDashboard,
   label: "Dashboard",
   href: "/default/",
  },
  {
   icon: Backpack,
   label: "Courses",
   href: "/default/courses", 
  },
];


export const SidebarRoutes = () => {
  const routes = guestRoutes;
     return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}