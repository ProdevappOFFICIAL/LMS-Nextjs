import { useData } from "@/app/db/DataProvider";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

const NavigationPanel = () => {
  const handlePageChange = (page: number) => {
    markVisited(page);
    setCurrentQuestion(page);
  };

  const {
    questions,
    setQuestions,
    currentQuestion,
    setCurrentQuestion,
    setSelectedOption,
  } = useData();

  const getButtonColor = (index: number) => {
    return questions[index]?.attempted ? "bg-red-600 text-white" : "bg-blue-600 text-white";
  };

  const markVisited = (index: number) => {
    let temp = [...questions];
    temp[currentQuestion].visited = true;
    setQuestions(temp);
    setSelectedOption(temp[index].userOption ?? -1);
  };

  return (
    <div className="flex flex-wrap mr-[20px]">
      <Pagination>
        <PaginationContent className="flex flex-wrap w-full mr-[20px] ">
          {questions.map((_, index) => (
            <PaginationItem className="m-1 " key={index}>
              <PaginationLink
                href="#"
                className={`pagination-link ${getButtonColor(index)} rounded px-3 py-1 transition duration-300`}
                isActive={currentQuestion === index}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(index);
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default NavigationPanel;

