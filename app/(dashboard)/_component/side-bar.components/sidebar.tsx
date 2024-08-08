"use client"
import { SidebarRoutes } from "./sidebar-routes"
import { Button } from "@/components/ui/button";
import { ChevronRight, Home, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link2Icon } from "@radix-ui/react-icons";

export const Sidebar = () => {
  const navi = useRouter();

  const handleNavigate = () => {
       navi.push('/default')
  }
  return(
    <div className="h-full border-r flex flex-col overflow-y-auto w-20  shadow-sm mr-10  bg-zinc-200/20">
    <div className=" flex flex-row justify-center my-5">
  
  <div className="p-4">

    <Home 
    className="bg-green-600 text-white p-2 rounded-full text-[18px]"
      onClick={handleNavigate}
    />

  </div>
   
    </div>
    <div className=" flex flex-col w-full transition-colors leading-7 [&:not(:first-child)]:mt-1">
<SidebarRoutes  />
    </div> 
    <div className="h-full"/>
  
    <Dialog>
              <DialogTrigger asChild>
                <div>
                <Button variant="outline" size="icon" className=" ml-5 py-1" >
 
         
                    <LogOutIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

                    <LogOutIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Enter Password</DialogTitle>
                  <DialogDescription>
                    <div className="mt-5">
                      <Input
                        placeholder="***************"  
                        className="bg-sky-200/20 " />
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit" size="sm" className="bg-red-600 dark:bg-red-800 px-3 dark:text-white dark:hover:bg-green-400">
                      <p className="text-[9px] mr-2 text-zinc-200">
                        <ChevronRight/>
                      </p>
                    
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>


    <div className="h-20"/>
</div>  
  )
}