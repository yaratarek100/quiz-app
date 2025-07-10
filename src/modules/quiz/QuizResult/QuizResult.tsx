import { Link, useLocation } from "react-router-dom";

export default function QuizResult() {
  const location = useLocation();
  const score = location.state?.score;

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-slate-500 mb-4"> Quiz Submitted!</h1>
      <p className="text-xl mb-4 my-3">Your Score: <span className="font-semibold">{score}</span></p>
       <Link
  to="/dashboard/quizzes"
  className="bg-yellow-300 text-white  px-4 py-2  rounded-md  transition duration-300"
>
  Join another quiz
</Link>
    </div>
  );
}