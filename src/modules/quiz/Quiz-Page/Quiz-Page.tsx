
import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { QUIZ_URLS } from "@/services/Urls";
import quizImg from "../../../assets/images/Quiz img.png";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Type 
interface Quiz {
  _id: string;
  title: string;
  schadule: string;
  participants: number;
 
}

export default function QuizPage() {
  const [upcommingQuizzes, setUpcommingQuizzes] = useState<Quiz[]>([]);

  const getUpcommingQuizzes = async () => {
    try {
      const result = await privateUserAxiosInstance(QUIZ_URLS.getTopUpcommingQuizzes);
      console.log(result.data);
      setUpcommingQuizzes(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUpcommingQuizzes();
  }, []);

  return (
    <>
      {upcommingQuizzes && upcommingQuizzes.length > 0 ? (
        upcommingQuizzes.map((quiz, index) => (
          <div
            key={quiz._id || index}
            className="flex flex-col sm:flex-row mb-5 border rounded-xl border-gray-300 hover:shadow-md bg-white"
          >
            <img
              src={quizImg}
              alt="Quiz"
              className="w-full sm:w-32 h-32 object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
            />
            <div className="px-4 py-3 flex flex-col justify-between w-full">
              <p className="font-semibold text-base text-gray-800 mb-1">{quiz.title}</p>
              <div className="text-sm text-gray-600 flex flex-wrap items-center">
                <span>{moment(quiz.schadule).format("DD/MM/YYYY hh:mm A")}</span>
                <span className="border-l border-gray-300 pl-3 ml-3">
                  No. of students enrolled: {quiz.participants}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-end px-4 pb-3 sm:pb-0">
               <Link className='text-decoration-none' to={`/quizzes-data/${quiz._id}`} >Open <span>➤</span></Link>
              <button  className="text-green-600 font-medium text-sm hover:underline flex items-center gap-1">
                Open <span>➤</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No upcoming quizzes available.</p>
      )}
    </>
  );
}
