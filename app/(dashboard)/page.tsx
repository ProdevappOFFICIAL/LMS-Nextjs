"use client"
import React, { useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Generallayout: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      // Redirect after 15 seconds
      router.push("/default");
    }, 15000);
  }, [router]); // Include `router` in the dependency array

  return (
    <div className="w-screen h-screen flex flex-col gap-y-4 justify-center items-center bg-white dark:bg-black">
      <Image
        src={'/l_icon.png'}
        width={100}
        height={100}
        alt="Logo" // Always add alt text for accessibility
      />
      <div className="h-5" />
      <HashLoader color="#43A047" />
    </div>
  );
};

export default Generallayout;
