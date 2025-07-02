import Questions from "../../../assets/images/questions.svg";
import newQuiz from "../../../assets/images/new quiz icon.svg";
import QuizPage from "../Quiz-Page/Quiz-Page";
import CompletedQuizzes1 from "../../Results/Completed-Quizzes/Completed-Quizzes";
import { useSelector } from "react-redux";
import type { IAppState } from "@/Interfaces/QuizInterface";
import { useDispatch } from "react-redux";
import { openModal } from "@/Redux/ModalSlice";
import { openJoinQuizModal } from "@/Redux/JoinQuizSlice";
import { Link } from "react-router-dom";


export default function Quizzes() {
  const dispatch = useDispatch();

  const loginData = useSelector((state: IAppState) => state.AuthReduceer.loginData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6">
    
      <div className="col-span-12 md:col-span-3 flex flex-col gap-6 self-start">
        {/* join Quiz */}
        {loginData.role === "Student" ? (
          <div
              onClick={() => dispatch(openJoinQuizModal())}
            className="cursor-pointer flex flex-col items-center text-center px-4 py-10 border border-gray-300 rounded hover:shadow-lg hover:bg-gray-50"
          >
            <img src={newQuiz} className="pb-3" alt="New Quiz" />
            <span className="font-nunito font-bold text-[20px]">Join Quiz</span>
          </div>
        ) : (
          <>
            <div
              onClick={() => dispatch(openModal())}
              className="cursor-pointer flex flex-col items-center text-center px-4 py-10 border border-gray-300 rounded hover:shadow-lg hover:bg-gray-50"
            >
              <img src={newQuiz} className="pb-3" alt="New Quiz" />
              <span className="font-nunito font-bold text-[20px]">Set up a new quiz</span>
            </div>

            <div className="cursor-pointer flex flex-col items-center text-center px-4 py-10 border border-gray-300 rounded hover:shadow-lg hover:bg-gray-50">
             <Link to="/dashboard/questions">
              <img src={Questions} className="pb-3" alt="Questions" />
              <span className="font-nunito font-bold text-[20px]">Question Bank</span>
             </Link>
            </div>
          </>
        )}
      </div>

      {/* Right section with quizzes */}
      <div className="col-span-12 md:col-span-9 space-y-6 ">
        {/* Upcoming Quizzes */}
        <div className="p-4 border border-gray-300 rounded bg-white hover:shadow-lg">
          <p className="my-4 text-lg font-bold text-gray-800">Upcoming quizzes</p>
          <QuizPage />
        </div>

        {/* Completed Quizzes */}
            <CompletedQuizzes1 />
      </div>

     
    </div>
  );
}
