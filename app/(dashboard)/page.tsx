"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CircleDashed } from "lucide-react";

const Generallayout: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
     router.push("/activate");
    }, 15000);
  }, [router]);

  return (
    <div className="w-screen h-screen flex flex-col gap-y-5 justify-center items-center bg-gradient-to-r from-green-600 to-green-400 text-white dark:bg-black">
       <div className="h-full" />
    <Image
        src={'/images/logo_white.png'}
        width={100}
        height={100}
        alt="LearnWithUncleLogo" //
      />
  
  <div className=" bg-gradient-to-r border border-green-400 from-green-500 to-green-400 rounded-full p-4">
 <CircleDashed className="animate-spin w-18 h-18"/>
  </div>
     

      <div className="h-full" />

      <div className="flex flex-row text-[10px] bg-green-400 w-full items-end justify-end px-2">
      Protins Copyright 2024
      </div>
    </div>

  );
};

export default Generallayout;
