"use client";
import { useData } from '@/app/db/DataProvider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, X } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

const Result = () => {
  const router = useRouter();
  const { questions, Reset } = useData();

  // Function to calculate the percentage score for a given category
  const calculateCategoryScore = (category: string) => {
    const categoryQuestions = questions.filter(ques => ques.category === category);
    const correctAnswers = categoryQuestions.reduce((total, ques) => {
      if (ques.correct_answer === ques.options?.[ques.userOption ?? -1]) {
        return total + 1;
      } else {
        return total;
      }
    }, 0);
    const scorePercentage = (correctAnswers / categoryQuestions.length) * 100;
    return {
      total: categoryQuestions.length,
      correct: correctAnswers,
      percentage: Math.round(scorePercentage),
    };
  };

  // Get unique categories from the questions
  const categories = Array.from(new Set(questions.map(ques => ques.category)));
  const scores = categories.map(category => ({
    category,
    ...calculateCategoryScore(category)
  }));

  // Calculate overall score
  const score = questions.reduce((total, ques) => {
    if (ques.correct_answer === ques.options?.[ques.userOption ?? -1]) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);

  const overallPercentage = Math.round((score / questions.length) * 100);

  return (
    <>
      <div className="ml-20 sm:ml-20 flex flex-col w-full h-full px-20 pt-5 text-black bg-white justify-center items-center">
        <div className='w-[300px]'> 
          <h2 className="header">
            <div className='flex items-center justify-center rounded-full text-[52px] w-52 h-52 bg-zinc-200/20 border select-none pointer-events-none'>
              {overallPercentage}%
            </div>
            <div className='h-5'/>
            <h1 className="text-xl font-semibold tracking-tight font-sans text-white">
              Exam Ended
            </h1>
          </h2>
          <div className='h-5'/>
          <div className="details-holder">
            <h3 className="text-[11px] text-muted-foreground font-sans">Your Score is: {score}/{questions.length}</h3>
            <div className='h-5'/>
            <h3 className="text-[11px] text-muted-foreground font-sans">You no sabi book</h3>
            <div className='h-5'/>
            <h3 className="text-[11px] text-muted-foreground font-sans">Your Performance</h3>
            <Progress className={`${overallPercentage <= questions.length ? 'bg-red-600' : 'bg-white'}`} value={overallPercentage} />
            <div className='h-5'/>
            <h3 className="text-[11px] text-muted-foreground font-sans">Average Performance</h3>
            <Progress value={50} />
              <div className="mt-5">
                <h2 className="text-xl font-semibold tracking-tight font-sans text-white">
                  Subject Grades
                </h2>
                {scores.map(({ category, correct, total, percentage }) => (
                  <div key={category} className="mt-2">
                    <h3 className="text-md font-sans">{category}: {correct}/{total} ({percentage}%)</h3>
                    <Progress value={percentage} />
                  </div>
                ))}
              </div>
          </div>
          <div className='h-5'/>
        
        </div>
        <div className='h-5'/>
        <Button 
          onClick={() => {
            router.push('/default');
            Reset();
          }}
        >
          Start New Quiz
        </Button>
        <div className="px-10">
          <div className="report-holder-top">
            <h1 className="text-xl font-semibold tracking-tight font-sans text-white">
              Questions
            </h1>
            <div className='flex'>Correct Option: <p className='ml-2 text-[9px] px-2 py-1 bg-green-600 rounded-sm text-white'>Correct Answer</p></div>
            <div className='h-3'/>
            <div className='flex'>Your Answer: <p className='ml-2  text-[9px] px-2 py-1 bg-red-600 rounded-sm text-white'>Your Answer</p></div>
          </div>
          <div className='h-5'/>
          <Card className="p-5 bg-zinc-200/20 border">
            {questions.map((ques, qIndex) => (
              <div className="rounded-sm select-none pointer-events-none" key={qIndex}>
                <div className="single-question select-none pointer-events-none">
                  {qIndex + 1}. {ques.question}
                </div>
                <div>
                  {ques.options?.map((option, oIndex) => (
                    <div
                      className={`flex flex-row ${option === ques.correct_answer ? 'correct' : ''} ${ques.userOption === oIndex ? 'user-option' : ''}`}
                      key={oIndex}
                    >
                      {String.fromCharCode(65 + oIndex)}. {option}
                      {option === ques.correct_answer && (
                        <span> <p className='ml-2 text-[9px] px-2 py-1 bg-green-600 rounded-sm text-white'>Correct Answer</p></span>
                      )}
                      {ques.userOption === oIndex && option !== ques.correct_answer && (
                        <span className='ml-2 flex'> Your Answer<p className='ml-2  text-[9px] px-2 py-1 bg-red-600 rounded-sm text-white'>Your Answer</p></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </>
  );
}

export default Result;
