"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link2Icon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { BellRing, FileJsonIcon, LogOutIcon, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useData } from "@/app/db/DataProvider";

const Dashboard = () => {
  const { setTheme } = useTheme();
  const router = useRouter();
  const {
    setCategory,
    quizNames,
    startMixedQuiz,
    setNumQuestions,
    navigateToQuiz,
  } = useData();

  const [selectedCategory, setSelectedCategory] = useState('Math');
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [time, setTime] = useState<number>(60); // Specify time as number type
  const [numQuestions, setQuestions] = useState<number>(60); // Specify numQuestions as number type

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory, setCategory]);

  const handleStartQuiz = () => {
    // setQuizTime(time);
    // setNumQuestions(numQuestions);
    navigateToQuiz(selectedQuiz);
    router.push('/default/exam');
  };

  const handleStartMixedQuiz = () => {
    // setQuizTime(time);
    setNumQuestions(numQuestions);
    startMixedQuiz();
    router.push('/default/exam');
  };

  return (
    <div className="flex flex-col ml-1 font-sans">
      <div className="flex flex-row my-2 p-5">
        <div className="w-fit sm:w-[250px] px-5 text-xl font-semibold tracking-tight transition-colors first:mt-0">
          Welcome back
        </div>
        <div>
          <select
            className={cn(
              "flex h-10 w-[60px] sm:w-fit items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            )}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option className="rounded-tr-sm rounded-lr-sm bg-white text-black" value="Math">Math</option>
            <option className="rounded-tr-sm rounded-lr-sm bg-white text-black" value="English">English</option>
            <option className="rounded-tr-sm rounded-lr-sm bg-white text-black" value="Physics">Physics</option>
            <option className="rounded-tr-sm rounded-lr-sm bg-white text-black" value="Chemistry">Chemistry</option>
            <option className="rounded-tr-sm rounded-lr-sm bg-white text-black" value="Biology">Biology</option>
          </select>
        </div>

        <div className="w-full"/>
      

        <div className="w-10"/>
        <div className="flex-row flex mr-2 sm:mr-10">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-5 sm:w-10"></div>

          <div>
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <Button variant="outline" size="icon">
                    <FileJsonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <FileJsonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Paste the File JSON</DialogTitle>
                  <DialogDescription>
                    <div className="mt-5">
                      <Input
                        defaultValue={'utcc-elearn://raw-json/{file-config}'}  
                        className="bg-sky-200/20 font-sans" />
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit" size="sm" className="bg-red-600 dark:bg-red-800 px-3 dark:text-white dark:hover:bg-green-400">
                      <p className="text-[9px] mr-2 text-zinc-200">
                        Import Json
                      </p>
                      <Link2Icon className="h-4 w-4 text-white" />
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-10 hidden sm:visible"></div>
          <div>
            <div className="flex-row flex hidden sm:visible">
              <Button variant="outline" size="icon">
                <LogOutIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <LogOutIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex-col h-10 ml-4 sm:ml-0 bg-yellow-200/20 justify-center dark:bg-yellow-200/20">
        <Separator />
        <div className="flex flex-row items-center px-5 pt-1">
          <BellRing className="dark:text-white w-6 h-6" />
          <div className="w-3" />
          <div className="w-[400px] text-black font-sans text-sm dark:text-white">
            Welcome to LearnWithUncleTee version 1.0.1
          </div>
          <div className="w-full"/>
          <p className="font-sans text-sm px-2 py-1 rounded-full bg-green-200/20 text-black">
            v1.01
          </p>
        </div>
      </div>
      <div className="h-5"/>
      <div className="flex flex-row lg:justify-between mx-7 sm:mx-14">
        <Dialog>
          <DialogTrigger asChild>
            <Card className="h-28 w-[350px] bg-green-200 dark:bg-green-800 font-sans mr-5 sm:mr-0">
              <CardHeader>
                <CardTitle>Start Exam</CardTitle>
                <CardDescription className="invisible sm:visible">
                  Start a 60 questions Exam on any desired Subject
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] font-sans">
            <DialogHeader>
              <DialogTitle>Start Exam</DialogTitle>
              <DialogDescription>
                Select desired Year and Subject
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Subject
                </Label>
                <label>
                  <select
                    value={selectedQuiz}
                    className={cn(
                      "flex h-10 w-fit items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                    )}
                    onChange={(e) => setSelectedQuiz(e.target.value)}
                  >
                    {quizNames.map((quiz: string) => (
                      <option className="bg-white text-black" key={quiz} value={quiz}>
                        {quiz}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleStartQuiz} type="submit" className="bg-green-600 dark:text-white dark:bg-green-800">
                Start Exam
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    
        <Dialog>
          <DialogTrigger asChild>
          <Card className="h-28 w-[350px] bg-sky-200 dark:bg-sky-800 mr-5 sm:mr-0">
              <CardHeader>
                <CardTitle>Random Exam</CardTitle>
                <CardDescription className="invisible sm:visible">
                  Start a random 60 questions on every subject
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="rounded-xl sm:max-w-[425px] font-sans">
            <DialogHeader>
              <DialogTitle>Random Quiz</DialogTitle>
              <DialogDescription>
                Start a 60 questions on different questions
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button className="bg-sky-600 hover:bg-sky-400 dark:text-white" type="submit" onClick={handleStartMixedQuiz}>Start now</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Card className="h-28 w-[350px] bg-red-200 dark:bg-red-800">
              <CardHeader>
                <CardTitle>Exam link</CardTitle>
                <CardDescription className="invisible sm:visible">
                  Enter the Online URL for the Exam
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] font-sans">
            <DialogHeader>
              <DialogTitle>CBT Link</DialogTitle>
              <DialogDescription>
                Input the given CBT &quot;URL&quot; into the input-area
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  className="bg-sky-200/20"
                  id="link"
                  defaultValue="utcc-elearn://exam-link/{file-config}"
                />
              </div>
              <Button type="submit" size="sm" className="bg-red-600 dark:bg-red-800 px-3 dark:text-white dark:hover:bg-green-400">
                <Link2Icon className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start"></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="h-5"></div>
      <div className="flex items-center justify-center"></div>
    </div>
  );
};

export default Dashboard;
