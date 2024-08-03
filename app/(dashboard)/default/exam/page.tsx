"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { CalculatorIcon, ChevronLeft, Timer } from "lucide-react";
import { useRouter } from "next/navigation";
import Calculator from "../../_component/plugin.components/calculator";
import { useEffect } from "react";
import { useData } from "@/app/db/DataProvider";
import NavigationPanel from "./navigation_panel";
import useTimer from "@/app/hook/useTimer";
import Image from "next/image";

const ExamPage = () => {
  const router = useRouter();
  const href = "/";
  const onClick = () => {
    router.push(href);
  };

  const {
    questions,
    setQuestions,
    currentQuestion,
    setCurrentQuestion,
    selectedOption,
    setSelectedOption,
    setCategory,
    quizNames,
    
    
  } = useData();

  const { time, startTimer } = useTimer(60, 0);


  useEffect(() => {
    startTimer();
    const handleKeyDown = (event: { key: string; }) => {
      const charCode = event.key.toUpperCase().charCodeAt(0);
      const index = charCode - 65; // Convert 'A' to 0, 'B' to 1, etc.
  
      if (index >= 0 && index < (questions[currentQuestion]?.options?.length ?? 0)) {
        setSelectedOption(index);
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [questions, currentQuestion, setSelectedOption, startTimer]);
  
  const markVisited = () => {
    let temp = [...questions];
    temp[currentQuestion].visited = true;
    setQuestions(temp);
    setSelectedOption(temp[currentQuestion]?.userOption ?? -1);
  };

  const saveAndNextFunction = () => {
    let temp = [...questions];
    temp[currentQuestion].userOption = selectedOption;
    temp[currentQuestion].visited = true;
  
    if (selectedOption !== -1) {
      temp[currentQuestion].attempted = true;
    } else if (temp[currentQuestion].attempted) {
      temp[currentQuestion].attempted = true;
    } else {
      temp[currentQuestion].attempted = false;
    }
  
    setQuestions(temp);
  
    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(0);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
    
    setSelectedOption(temp[currentQuestion + 1]?.userOption ?? -1);
  };

  const getCheckedOption = (option: number) => {
    return selectedOption !== -1
      ? selectedOption === option
      : option === questions[currentQuestion].userOption;
  };

  const clearSelectionFunction = () => {
    setSelectedOption(-1);
    let temp = [...questions];
    temp[currentQuestion].userOption = -1;
    temp[currentQuestion].attempted = false;
    setQuestions(temp);
  };

  const saveAndSubmit = () => {
    let temp = [...questions];
    temp[currentQuestion].userOption = selectedOption;
    temp[currentQuestion].visited = true;

    if (selectedOption !== -1) {
      temp[currentQuestion].attempted = true;
    } else if (temp[currentQuestion].attempted) {
      temp[currentQuestion].attempted = true;
    } else {
      temp[currentQuestion].attempted = false;
    }

    setQuestions(temp);
    router.push('/default/exam/result');
  };

  return (
    <div className="flex flex-col ml-1 h-[500px]">
      <div className="flex flex-row p-5 my-2">
        <div>
          <Button onClick={onClick} variant="outline" size="icon" className="bg-gray-200/20">
            <ChevronLeft className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </div>
        <div className="w-10" />
      
        <div className="w-10" />
        <div>
          <Button
            onClick={() => {
              if (currentQuestion !== 0) {
                markVisited();
                setCurrentQuestion(currentQuestion - 1);
              }
            }}
            variant="outline"
            className="dark:bg-black text-white bg-blue-600 border rounded-lg px-5 hover:bg-blue-400 hover:text-white"
          >
            <div className="h-[1.2rem] w-[5.0rem]">Previous</div>
          </Button>
        </div>
        <div className="w-10" />
        <div>
          <Button
            onClick={saveAndNextFunction}
            className="dark:bg-black bg-blue-600 border rounded-lg pr-10 hover:bg-blue-400"
          >
            <div className="h-[1.2rem] w-[5.0rem]">Save and Next</div>
          </Button>
        </div>
        <div className="w-full" />
        <Dialog>
          <DialogTrigger asChild>
            <div>
              <Button size="icon" className="bg-red-600 rounded-lg px-10 hover:bg-red-400">
                <div className="h-[1.2rem] w-[5.0rem]">Submit</div>
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="rounded-xl sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Submit</DialogTitle>
              <DialogDescription>Are you sure you want to submit</DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button variant="destructive" type="submit" onClick={saveAndSubmit}>
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="w-10" />
        <div className="flex-row flex">
          <Button variant="outline" size="icon" className="px-20 gap-y-3">
            <div className="h-[1.2rem] w-[5.0rem] mr-6">
              <Timer className="h-[1.2rem] w-[1.2rem]" />
            </div>
            
            <div className="h-[1.2rem] w-[5.0rem]">
              {time.min < 10 ? "0" + time.min : time.min}:
              {time.sec < 10 ? "0" + time.sec : time.sec}{" "}
            </div>
          </Button>
        </div>
        <div className="w-10" />
        <Dialog>
          <DialogTrigger asChild>
            <div>
              <Button variant="outline" size="icon">
                <CalculatorIcon className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Calculator</DialogTitle>
              <DialogDescription>
                Simple Calculator
                <div className="mt-5">
                  <Calculator />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <div className="flex flex-col px-10 my-10 w-auto h-fit">
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row">
                Questions <div className="w-full" /> {questions[currentQuestion]?._id}/{questions.length}
              </div>
            </CardTitle>
            <div className="h-1" />
            <CardDescription className="select-none pointer-events-none">{questions[currentQuestion]?.question}</CardDescription>
          </CardHeader>
          <div className="flex flex-row">
            <CardContent className="flex flex-col">
              <div className="flex flex-col select-none">
                {questions[currentQuestion]?.options?.map((option, index) => (
                  <div key={index} className="flex w-[500px] items-center p-3">
                    <input
                      type="radio"
                      className="justify-start items-start"
                      name="xyz"
                      id={`option-${index}`}
                      checked={getCheckedOption(index)}
                      value={index}
                      onChange={(e) => setSelectedOption(Number(e.target.value))}
                    />
                    <label htmlFor={`option-${index}`} className="ml-2">
                      {String.fromCharCode(65 + index)}. {option}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="w-full" />
            <div className="w-[700px] mr-4">
  <Image
  className="select-none pointer-events-none"
    src={questions[currentQuestion]?.img ?? '/favicon.ico'} // Fallback image URL
    alt={``}
    width={100}
    height={100}
    onError={(e) => (e.currentTarget.src = '/favicon.ico')} // Fallback image on error
    layout="responsive"
    placeholder="blur"
    blurDataURL="/favicon.ico"
    style={{ width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
  />
</div>


          </div>
        </Card>
      </div>
      <div className="w-full flex items-start justify-start mx-[30px] mr-[30px] ">
        <NavigationPanel />
      </div>
      <div className="flex flex-row mx-10 w-auto h-fit"></div>
      <div className="h-full" />
      <div className="flex flex-row items-center shrink-0 justify-center mx-10 mt-10 w-auto h-fit">
        <div className="w-full" />
        <div className="flex-row flex">
    </div>
      </div>
    </div>
  );
};

export default ExamPage;
