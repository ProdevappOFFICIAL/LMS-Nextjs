"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({
  icon: Icon,
  label: String,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/default" && href === "/default") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 rounded-2xl mx-2 text-sm font-[500] pl-6 transition-all hover:rounded-2xl hover:mx-2 hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "flex items-center text-green-700 mx-2 bg-green-600 rounded-2xl hover:rounded-2xl dark:bg-green-800 dark:text-white hover:bg-green-400 hover:text-green-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && " text-white"
          )}
        />
   
      </div>
     
    </button>
  )
}