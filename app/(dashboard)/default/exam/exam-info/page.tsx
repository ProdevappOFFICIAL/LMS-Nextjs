import Image from "next/image";
import { Button } from "@/components/ui/button";

const ExamInfoPage = () => {
 return (
  <div className=" h-screen w-screen flex justify-center items-center">
   <div className=" flex-col flex">
    <div className=" bg-blue-500">
 

    </div>

    <div className=" flex flex-row items-end justify-end">
     <Button size="icon" className=" bg-green-600 rounded-lg px-10 hover:bg-red-400">


      <div className=" h-[1.2rem] w-[5.0rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" >
       Begin
      </div>
      <div className="absolute h-[1.2rem] w-[5.0rem]  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-white " >
       Begin
      </div>
     </Button>
    </div></div>
  </div>

 )
}

export default ExamInfoPage;