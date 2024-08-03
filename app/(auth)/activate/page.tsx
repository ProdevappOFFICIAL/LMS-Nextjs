"use client"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

const Activate = () => {
      const router = useRouter();
      useEffect(() => {
            setTimeout(() => {
            }, 15000);
            //if user enter correct key
            //router.push("/default")
      }, [])
      return (
            <>
               
                  <div className=" p-20 sm:p-0ed flex h-[800px]  flex-col items-center justify-center">
      
                        <div className="lg:p-8">
                              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                                    <div className="flex flex-col space-y-2 text-center">
                                          <h1 className="text-2xl font-semibold tracking-tight font-sans">
                                                Entry Key
                                          </h1>
                                          <p className="text-sm text-muted-foreground font-sans">
                                                Enter your entry key to access your account
                                          </p>
                                    </div>
                                    
                                    <p className="px-8 text-center text-sm text-muted-foreground font-sans">
                                          By clicking continue, you agree to our{" "}
                                          <Link
                                                href="/terms"
                                                className="underline underline-offset-4 hover:text-primary font-sans"
                                          >
                                                Terms of Service
                                          </Link>{" "}
                                          and{" "}
                                          <Link
                                                href="/privacy"
                                                className="underline underline-offset-4 hover:text-primary font-sans"
                                          >
                                                Privacy Policy
                                          </Link>
                                          .
                                    </p>
                              </div>
                        </div>
                  </div>
            </>

      )
}
export default Activate;