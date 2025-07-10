import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { QUIZ_URLS } from "@/services/Urls";
import quizImg from "../../../assets/images/qm.png";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { IAppState, IQuiz } from "@/Interfaces/QuizInterface";
import { useSelector } from "react-redux";
import { FaArrowRightLong } from "react-icons/fa6";

export default function QuizPage() {
  const location = useLocation();
  const [Quizzes, setQuizzes] = useState<IQuiz[]>([]);

  const loginData = useSelector(
    (state: IAppState) => state.AuthReduceer.loginData
  );

  // ✅ get quizzes and return them instead of setting directly
  const getUpcommingQuizzes = async (url: string) => {
    try {
      const result = await privateUserAxiosInstance(url);
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchData = async () => {
    let url: string;
    if (
      location.pathname.includes("all-Quizzes") &&
      loginData.role === "Instructor"
    ) {
      url = QUIZ_URLS.getAll;
      const data = await getUpcommingQuizzes(url);
      setQuizzes(data);
    } else {
      url = QUIZ_URLS.getTopUpcommingQuizzes;
      const data = await getUpcommingQuizzes(url);
      const latestFive = Array.isArray(data) ? data.slice(-5).reverse() : [];
      setQuizzes(latestFive);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.pathname, loginData.role]);

  return (
    <div className=" bg-white hover:shadow-lg w-full border border-gray-300 p-6 rounded-lg shadow-md max-w-[1000px]  ">
      {location.pathname.includes("/all-Quizzes") ? (
        <div className="flex justify-between">
          <p className="my-4 text-lg font-bold text-gray-800">All Quizzes</p>
        </div>
      ) : (
        <div className="flex justify-between">
          <p className="my-4 text-lg font-bold text-gray-800">
            Upcoming Quizzes
          </p>
          {location.pathname === "/dashboard/quizzes" ? (
            <div className="flex justify-end items-center px-4">
              <Link to="/dashboard/quizzes/all-Quizzes">
                <div className="flex items-center space-x-2">
                  <span className="text-base font-semibold text-yellow-300">
                    All Quizzes
                  </span>
                  <FaArrowRightLong className="text-xl text-yellow-300" />
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex justify-end items-center px-4">
              <Link to="/dashboard/quizzes">
                <div className="flex items-center space-x-2">
                  <span className="text-base font-semibold text-yellow-300">
                    Quiz Directory
                  </span>
                  <FaArrowRightLong className="text-xl text-yellow-300" />
                </div>
              </Link>
            </div>
          )}

        </div>
      )}


      {Quizzes && Quizzes.length > 0 ? (
        Quizzes.map((quiz, index) => (
       <div
  key={quiz._id || index}
  className={
    `flex relative items-center flex-wrap mb-5 border rounded-xl border-gray-300 hover:shadow-md bg-white min-w-60 ` 
  
  }
>
            <div className="divImg w-1/2 h-30 sm:max-w-1/3 max-w-50 min-w-20">
              <img
                src={quizImg}
                alt="Quiz"
                className="p-3 mx-auto h-full object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
              />
            </div>

            <div className="px-3 flex flex-col justify-center w-1/2 sm:w-1/4 sm:grow overflow-hidden ">
              <h2 className="text-sm font-semibold w-full overflow-hidden">
                {quiz.title}
              </h2>
              <p className="text-gray-500 text-xs">Code: {quiz?.code}</p>
              <p className="text-gray-500 text-xs">
                Difficulty: {quiz?.difficulty}
              </p>
              <p className="text-gray-500 text-xs">
                Duration: {quiz?.duration}
              </p>
            </div>
            {location.pathname.endsWith("/all-Quizzes") ? (
              <div className="text-sm text-gray-600 flex justify-center items-center w-full md:max-w-1/4 grow px-3 text-center">
                <p className="w-fit bg-white">
                  {moment(quiz.schadule).format("DD/MM/YYYY hh:mm A")}
                </p>
                <p className="border-l border-gray-300 pl-3 ml-3 w-fit">
                  No. of students: {quiz.participants}
                </p>
              </div>
            ):null}

            <div className="flex sm:absolute xl:relative ms-auto bottom-0 right-0 items-center justify-end px-4 pb-3 sm:pb-0 m-2">
              <Link
                className="text-yellow-300 font-medium text-sm hover:underline flex items-center gap-1"
                to={`/dashboard/quizzes-data/${quiz._id}`}
              >
                Open <span>➤</span>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No upcoming quizzes available.</p>
      )}
    </div>
  );
}
