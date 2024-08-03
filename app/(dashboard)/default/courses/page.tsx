'use client'
import React, { useState } from 'react';
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useData } from '@/app/db/DataProvider';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { BellRing, Check } from 'lucide-react';

const Coursepage: React.FC = () => {
  const { setCategory, setSelectedYear, quizNames, navigateToQuiz, questions } = useData();
  const [selectedCategory, setSelectedCategory] = useState('Math');
  const [selectedYear, setSelectedYearLocal] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setCategory(category);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = event.target.value;
    setSelectedYearLocal(year);
    setSelectedYear(year);
  };

  const handleQuizChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const quiz = event.target.value;
    setSelectedQuiz(quiz);
    navigateToQuiz(quiz);
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} className="bg-yellow-300">{part}</span> : part
    );
  };

  const filteredQuestions = questions.filter(question =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (question.options && question.options.some(option => option.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="flex flex-col ml-1">
      <div className="flex flex-row my-2  p-5 items-center">
        <div className="w-[350px]  text-xl font-semibold tracking-tight transition-colors first:mt-0">
          Practice Courses
        </div>
        <div className='w-full'/>
        <div className="flex  gap-x-3 items-center font-sans">
            <div>
              <select
                className="flex h-10 w-[60px] sm:w-fit items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option className="bg-white text-black" value="Math">Math</option>
                <option className="bg-white text-black" value="English">English</option>
                <option className="bg-white text-black" value="Physics">Physics</option>
                <option className="bg-white text-black" value="Chemistry">Chemistry</option>
                <option className="bg-white text-black" value="Biology">Biology</option>
              </select>
            </div>
            <div>
              <select
                className="flex h-10 w-[60px] sm:w-fit items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedQuiz}
                onChange={handleQuizChange}
              >
                {quizNames.map((quizName, index) => (
                  <option key={index} className="bg-white text-black" value={quizName}>
                    {quizName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex py-3 gap-x-3 items-center font-sans">
              <input
                type="text"
                placeholder="Search questions..."
                className="flex h-10 w-[60px] sm:w-fit items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
      </div>
      <Separator />
      <div className="w-full h-10 bg-yellow-200/20 justify-center dark:bg-yellow-200/20">
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
      <div className="h-5" />
      <div className="flex flex-col px-10">
        <div className='font-sans'>
          <h2 className="text-2xl mb-3">Questions</h2>
          <div className='border-t-green-600 border-[2px] rounded-sm shadow-sm'>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question, index) => (
                <div key={question._id} className='flex flex-col'>
                  <div className='flex flex-row items-center border-t'>
                    <div className='flex flex-col w-4/5'>
                      <div className="p-5 py-3 rounded-sm">
                        <h3>{question._id}. {highlightText(question.question, searchTerm)}</h3>
                      </div>
                    </div>
                    <div className='flex items-center w-2/12'>
                      {question.img && (
                        <div className="pointer-events-none select-none">
                          <Image
                            src={question.img}
                            alt={`Question ${question._id}`}
                            width={100}
                            height={100}
                            onError={(e) => (e.currentTarget.src = '/l_icon.png')} // Fallback image on error
                            layout="responsive"
                            placeholder="blur"
                            blurDataURL="/l_icon.png"
                            style={{ width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className='bg-green-200/20 px-3 py-2 w-full pl-7'>
                    {question.options?.map((option, i) => (
                      <div
                        className={`flex flex-row items-center ${option === question.correct_answer ? 'correct' : ''} ${question.userOption === i ? 'user-option' : ''}`}
                        key={i}
                      >
                        {String.fromCharCode(65 + i)}. {option}
                        {option === question.correct_answer && (
                          <span className='flex items-center ml-2 text-[9px] px-2 py-1 text-green-600 text-extrabold'>
                            <p className='p-[1px] text-white rounded-full bg-green-600'>
                              <Check/>
                            </p>
                          </span>
                        )}
                      </div>
                    ))}
                  </p>
                </div>
              ))
            ) : (
              <p className='p-3'>No questions available or select a year</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coursepage;
