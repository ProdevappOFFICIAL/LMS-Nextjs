"use client"
import { SidebarRoutes } from "./sidebar-routes"
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";

export const Sidebar = () => {
  return(
    <div className="h-full border-r flex flex-col overflow-y-auto w-20  shadow-sm mr-10  bg-zinc-200/20">
    <div className=" flex flex-row justify-center my-5">
  
  <div className="p-4">
  <Image
    src={'/l_icon.png'}
   width={100}
   height={100}
   alt="no"
  />
  </div>
   
    </div>
    <div className=" flex flex-col w-full transition-colors leading-7 [&:not(:first-child)]:mt-1">
<SidebarRoutes  />
    </div> 
    <div className="h-full"/>
    <Button variant="outline" size="icon" className=" ml-5 py-1" >
 
         
          <LogOutIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        
        <LogOutIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
</Button>
    <div className="h-20"/>
</div>  
  )
}