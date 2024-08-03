"use client";
import React, { useContext, createContext, useState, useEffect, ReactNode, FC } from "react";
import { useRouter } from "next/navigation";
import mathQuestions from './data/mathQues.json';
import englishQuestions from './data/englishQues.json';
import physicsQuestions from './data/phyQues.json';
import chemistryQuestions from './data/chemQues.json';
import biologyQuestions from './data/biologyQues.json';
import { Question } from "../commonTypes"; 

interface DataContextType {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  selectedOption: number;
  setSelectedOption: React.Dispatch<React.SetStateAction<number>>;
  Reset: () => void;
  navigateToQuiz: (quizName: string) => void;
  quizNames: string[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  startMixedQuiz: () => void;
  CustomixedQuiz: () => void;
  setNumQuestions: React.Dispatch<React.SetStateAction<number>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: string;
}

interface DataProviderProps {
  children: ReactNode;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState(-1);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [category, setCategory] = useState("Math");
  const [numQuestions, setNumQuestions] = useState(60);
  const [examlink, setexamlink] = useState('');
  const [selectedYear, setSelectedYear] = useState("");

  const getQuizNames = (category: string): string[] => {
    switch (category) {
      case "Math":
        return Object.keys(mathQuestions);
      case "English":
        return Object.keys(englishQuestions);
      case "Physics":
        return Object.keys(physicsQuestions);
      case "Chemistry":
        return Object.keys(chemistryQuestions);
      case "Biology":
        return Object.keys(biologyQuestions);
      default:
        return [];
    }
  };

  const quizNames = getQuizNames(category);

  const getData = (quizName: string) => {
    const quizQuestions: Question[] = (() => {
      switch (category) {
        case "Math":
          return (mathQuestions as any)[quizName];
        case "English":
          return (englishQuestions as any)[quizName];
        case "Physics":
          return (physicsQuestions as any)[quizName];
        case "Chemistry":
          return (chemistryQuestions as any)[quizName];
        case "Biology":
          return (biologyQuestions as any)[quizName];
        default:
          return [];
      }
    })();

    const formattedQuestions: Question[] = quizQuestions.map((ques, index) => {
      let options: string[] = [];
      options.push(...ques?.incorrect_answers);
      options.push(ques?.correct_answer);
      return {
        ...ques,
        _id: index + 1,
        visited: false,
        attempted: false,
        userOption: -1,
        options: options.sort(() => Math.random() - 0.5),
        img: ques.img
      };
    });
    setQuestions(formattedQuestions.slice(0, numQuestions));
  };

  const getAllQuestions = () => {
    // Function to ensure each question is typed correctly
    const ensureQuestionType = (data: any): Question => {
      return {
        category: data.category || "",
        type: data.type || "",
        difficulty: data.difficulty || "",
        question: data.question || "",
        correct_answer: data.correct_answer || "",
        incorrect_answers: data.incorrect_answers || [],
        img: data.img || "",
        _id: data._id || 0,
        visited: data.visited || false,
        attempted: data.attempted || false,
        userOption: data.userOption || -1,
        options: data.options || []
      };
    };
  
    const allQuestions: Question[] = [
      ...Object.values(mathQuestions).flat().map(ensureQuestionType),
      ...Object.values(englishQuestions).flat().map(ensureQuestionType),
      ...Object.values(physicsQuestions).flat().map(ensureQuestionType),
      ...Object.values(chemistryQuestions).flat().map(ensureQuestionType),
      ...Object.values(biologyQuestions).flat().map(ensureQuestionType)
    ];
  
    const selectedQuestions: Question[] = [];
    while (selectedQuestions.length < numQuestions && allQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * allQuestions.length);
      const [question] = allQuestions.splice(randomIndex, 1);
      selectedQuestions.push({
        ...question,
        visited: false,
        attempted: false,
        userOption: -1,
        options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
        img: question.img
      });
    }
  
    setQuestions(selectedQuestions);
  };
  

  const CustomQuiz = async () => {
    try {
      const response = await fetch(`https://localhost:5000/` + examlink);
      const data = await response.json();
      const allQuestions: Question[] = data.flat();
      const selectedQuestions: Question[] = [];
      while (selectedQuestions.length < numQuestions && allQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * allQuestions.length);
        const [question] = allQuestions.splice(randomIndex, 1);
        selectedQuestions.push({
          ...question,
          visited: false,
          attempted: false,
          userOption: -1,
          options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
          img: question.img
        });
      }
      setQuestions(selectedQuestions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Reset = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setUserEmail("");
    setSelectedOption(-1);
    router.push('/default');
  };

  const navigateToQuiz = (quizName: string) => {
    setSelectedQuiz(quizName);
    getData(quizName);
  };

  const startMixedQuiz = () => {
    getAllQuestions();
  };

  const CustomixedQuiz = () => {
    CustomQuiz();
  };

  return (
    <DataContext.Provider
      value={{
        questions,
        setQuestions,
        currentQuestion,
        setCurrentQuestion,
        userEmail,
        setUserEmail,
        selectedOption,
        setSelectedOption,
        Reset,
        navigateToQuiz,
        quizNames,
        setCategory,
        startMixedQuiz,
        CustomixedQuiz,
        setNumQuestions,
        setSelectedYear,
        selectedYear,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
