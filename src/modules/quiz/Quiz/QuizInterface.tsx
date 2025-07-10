import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { QUIZ_URLS } from "@/services/Urls";
import { useNavigate, useParams } from "react-router-dom";
import type { IQuizData } from "@/Interfaces/QuizInterface";



type AnswerMap = Record<string, "A" | "B" | "C" | "D">;

export default function QuizInterface() {
  const [quizData, setQuizData] = useState<IQuizData | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams() as { id: string };

  const FetchQuizQuestions = async () => {
    try {
      const response = await privateUserAxiosInstance.get(
        `/quiz/without-answers/${id}`
      );
      setQuizData(response.data.data);
      console.log("Quiz Data:", response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchQuizQuestions();
  }, []);

  const handleOptionChange = (questionId: string, selectedOption: "A" | "B" | "C" | "D") => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };



const questionsLength = quizData?.questions?.length ?? 0;

const isAllAnswered =
  questionsLength > 0 &&
  Object.keys(answers).length === questionsLength;




const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!quizData) return;

  const formattedAnswers = Object.entries(answers).map(([question, answer]) => ({
    question,
    answer,
  }));

  try {
    const response = await privateUserAxiosInstance.post(
      QUIZ_URLS.submitQuizAnswers(quizData._id),
      { answers: formattedAnswers }
    );

    const score = response.data.data?.score; 
    toast.success(response.data.message || "Submitted successfully!");

      
    navigate("/dashboard/quiz-result", { state: { score } });

  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message || "Something Went Wrong");
    }
  }
};









  if (isLoading) return <div className="text-center p-10">Loading...</div>;

  if (!quizData) return <div className="text-center text-red-500">No quiz data available.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">{quizData.title}</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {quizData.questions.map((question) => (
          <div
            key={question._id}
            className="p-4 border border-gray-300 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-102 hover:bg-gray-50"
          >
            <h2 className="text-lg font-semibold mb-2">{question.title}</h2>
            <div className="space-y-2">
              {(["A", "B", "C", "D"] as const).map((letter) => (
                <label key={letter} className="flex items-center gap-2 bg-white text-slate-700">
                  <input
                    type="radio"
                    name={question._id}
                    value={letter}
                    className="accent-yellow-300"
                    onChange={() => handleOptionChange(question._id, letter)}
                    checked={answers[question._id] === letter}
                  />
                  {letter}. {question.options[letter]}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="col-span-full mt-4 text-center">
          <button
            type="submit"submit
            disabled={!isAllAnswered}
            className={`px-6 py-2 cursor-pointer rounded-full text-white space-x-2 hover:scale-105 transition-transform duration-300 ${
              isAllAnswered
                ? "bg-yellow-300"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
