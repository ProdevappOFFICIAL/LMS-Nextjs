"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User } from "lucide-react";
const savedPasswords: string[] = ['8001', '0032', 'letmein'];

const Home  = ({ }) => {
  const navi = useRouter();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

  const passwordMap: { [key: string]: string } = {
    '#': '1',
    '+': '2',
    '-': '3',
    '?': '4',
    '!': '5',
    '÷': '6',
    '@': '7',
    '*': '8',
    '~': '9',
    '6': '0'
  };
  
  
  const transformPassword = (input: string): string => {
    return input.split('').map(char => passwordMap[char] || char).join('');
  };

  const handleLogin = () => {
    const transformedPassword = transformPassword(password);
    if (savedPasswords.includes(transformedPassword)) {
    setMessage('Login successful!');
    navi.push('/default')
    setAttempts(0);
  } else {
    setAttempts(prev => prev + 1);
    
    
    if (attempts >= 3) {
      navi.push('/')
    }
  }
}
  return (

      <div className=" flex flex-row w-full h-screen ">
        <div className=" hidden sm:flex flex-col w-1/2  bg-green-600 justify-center items-center  p-8  text-white  text-2xl font-semibold tracking-tight">
        <Image
        src={'/images/logo_white.png'}
        width={100}
        height={100}
        alt="LearnWithUncleLogo" //
      />
        </div>

        <div className=" flex flex-col items-center justify-center w-full sm:w-6/12   bg-white text-black">
          <div className="flex flex-row w-full items-end mt-2 mr-2">
            <div className="w-full"/>
  
          </div>
         
        <div className="flex flex-col w-full   h-full  justify-center items-center px-10">           
        <div className=" p-10 rounded-full bg-green-600 text-white">
            <User/>
            </div>      
        <div className=" h-5"/>

         <p> Enter Entry Key</p>
     <div className=" h-5"/>
     <Input 
     className=" text-zinc-400 bg-sky-300/20 "
       title="Input Activation Code" 
      type="password" 
      placeholder="Enter the Activation Code"
      value={password}
      onChange={(e) => setPassword(e.target.value)} 
      ></Input>

         <div className=" h-5"/>
         <Button className="text-[11px]   w-full bg-green-600 text-white hover:bg-zinc-500"   onClick={handleLogin}>Enter Key</Button></div>
         <div className=" h-5"/>

        
         </div>
        </div>
      
      
  )
}
export default Home;