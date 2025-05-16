import Questions from "../../../assets/images/questions.svg";
import newQuiz from "../../../assets/images/new quiz icon.svg";
import { useState } from "react";
import QuizForm from "../Quiz-Form/Quiz-Form";

export default function Quizzes() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
        <div
          onClick={() => setOpenDialog(true)}
          className="cursor-pointer flex flex-col items-center text-center px-4 py-10 border border-gray-300 rounded transition-all duration-300 hover:shadow-lg hover:bg-gray-50 "
        >
          <img src={newQuiz} className=" pb-3" />

          <span className="font-nunito font-bold text-[20px] leading-[100%] tracking-[0%]">
            Set up a new quiz
          </span>
        </div>

        <div className="flex flex-col items-center text-center px-4 py-10 border border-gray-300 rounded transition-all duration-300 hover:shadow-lg hover:bg-gray-50 ">
          <img src={Questions} className=" pb-3" />
          <span className="font-nunito font-bold text-[20px] leading-[100%] tracking-[0%]">
            Question Bank
          </span>
        </div>
      </div>
      <div className="p-4 border border-gray-300 rounded transition-all duration-300 hover:shadow-lg hover:bg-gray-50 flex justify-between">
        Upcoming quizzes
      </div>
      {/* Dialog to add */}
      <QuizForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
}
