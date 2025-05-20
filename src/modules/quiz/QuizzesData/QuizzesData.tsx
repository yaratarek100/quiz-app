
// import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { privateUserAxiosInstance } from "@/services/Axiosinstance";
// import { QUIZ_URLS } from "@/services/Urls";
// import { Input } from "@/components/ui/input";
// import { MdKeyboardDoubleArrowRight } from "react-icons/md";
// import moment from "moment";
// import { DatePickerDemo } from "@/modules/shared/date-picker/date-picker";
// import { FaPen } from "react-icons/fa";
// import { toast } from "react-toastify";

// export default function QuizzesData() {
//   const { id } = useParams();
//   const [quizDetails, setQuizDetails] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);  
//   const { register, setValue, handleSubmit } = useForm();

//   // getQuiz
//   const getQuiz = async () => {
//     try {
//       const result = await privateUserAxiosInstance(QUIZ_URLS.getQuiz(id));
//       const quizData = result.data;
//       setQuizDetails(quizData);

      
//       setValue("duration", quizData.duration.toString());
//       setValue("numberOfQuestions", quizData.questions.length.toString());
//       setValue("scorePerQuestion", quizData.score_per_question.toString());
//       setValue("description", quizData.description);

    
//       setSelectedDate(new Date(quizData.schadule));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // editQuiz
//   const editQuiz = async (data) => {
//     try {
//       const payload = {
//         duration: parseInt(data.duration),
//         score_per_question: parseFloat(data.scorePerQuestion),
//         description: data.description,
//         schadule: selectedDate?.toISOString(),
//       };

//       const result = await privateUserAxiosInstance.put(
//         QUIZ_URLS.updateQuiz(id),
//         payload
//       );

//       console.log("Quiz updated:", result);
//       toast.success(result.data.message)
//     } catch (error) {
//       console.log("Error updating quiz:", error);
//       toast.error(error.response.data.message)
//     }
//   };

//   useEffect(() => {
//     getQuiz();
//   }, []);

//   return (
//     <>
//       <div className="flex items-center">
//         <Link
//           to="/dashboard/quizzes"
//           className="font-medium hover:underline underline-offset-2 mx-2"
//         >
//           Quizzes
//         </Link>
//         <MdKeyboardDoubleArrowRight className="text-[#C5D86D] text-2xl" />
//         <p className="mx-2"> {quizDetails.title}</p>
//       </div>

//       <div className="w-2/3">
//         <div className="p-4 mt-6 border border-gray-300 rounded bg-white hover:shadow-lg">
//           <form onSubmit={handleSubmit(editQuiz)}>
//             <div className="title">
//               <p className="mx-2 text-2xl font-bold">{quizDetails.title}</p>
//               <div className="flex items-center gap-2">
//                 <DatePickerDemo
//   className="outline-0 border-0 sm:w-auto"
//   showPlaceholder={false}
//   value={selectedDate}
//   onChange={setSelectedDate}
// />
//                 {selectedDate && (
//                   <span>
//                     {moment(selectedDate).format("DD/MM/YYYY hh:mm A")}
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="relative col-span-3 my-3">
//               <label
//                 htmlFor="duration"
//                 className="absolute w-38 left-0 top-0 text-sm bg-[#FFEDDF] text-black px-2 py-2 z-10 rounded"
//               >
//                 Duration
//               </label>
//               <Input
//                 id="duration"
//                 className="pl-[160px] py-2"
//                 {...register("duration", { required: true })}
//               />
//             </div>

//             <div className="relative col-span-3 my-3">
//               <label
//                 htmlFor="numberOfQuestions"
//                 className="absolute w-38 left-0 top-0 text-sm bg-[#FFEDDF] text-black px-2 py-2 z-10 rounded"
//               >
//                 Number of Questions
//               </label>
//               <Input
//                 id="numberOfQuestions"
//                 className="pl-[160px] py-2"
//                 {...register("numberOfQuestions", { required: true })}
//               />
//             </div>

//             <div className="relative col-span-3 my-3">
//               <label
//                 htmlFor="scorePerQuestion"
//                 className="absolute w-38 left-0 top-0 text-sm bg-[#FFEDDF] text-black px-2 py-2 z-10 rounded"
//               >
//                 Score Per Question
//               </label>
//               <Input
//                 id="scorePerQuestion"
//                 className="pl-[160px] py-2"
//                 {...register("scorePerQuestion", { required: true })}
//               />
//             </div>

//             <div className="relative col-span-3 my-3">
//               <label
//                 htmlFor="description"
//                 className="absolute w-38 left-0 top-0 text-sm bg-[#FFEDDF] text-black px-2 py-2 z-10 rounded"
//               >
//                 Description
//               </label>
//               <Input
//                 id="description"
//                 className="pl-[160px] py-2"
//                 {...register("description", { required: true })}
//               />
//             </div>

//             <button
//               className="bg-[#0D1321] text-white p-2 rounded-2xl flex items-center gap-2"
//               type="submit"
//             >
//               <FaPen />
//               <span>Edit</span>
//             </button>
//           </form>
//         </div>
//       </div>
    

//     </>
//   );
// }


import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { QUIZ_URLS } from "@/services/Urls";
import { Input } from "@/components/ui/input";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import moment from "moment";
import { DatePickerDemo } from "@/modules/shared/date-picker/date-picker";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";


interface QuizFormInputs {
  duration: string;
  numberOfQuestions: string;
  scorePerQuestion: string;
  description: string;
}

interface QuizData {
  title: string;
  duration: number;
  questions: { id: string }[];
  score_per_question: number;
  description: string;
  schadule: string;
}

export default function QuizzesData() {
  const { id } = useParams<{ id: string }>();
  const [quizDetails, setQuizDetails] = useState<QuizData | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { register, setValue, handleSubmit } = useForm<QuizFormInputs>();

  const getQuiz = async () => {
    try {
      const result = await privateUserAxiosInstance(QUIZ_URLS.getQuiz(id!));
      const quizData: QuizData = result.data;
      setQuizDetails(quizData);

      setValue("duration", quizData.duration.toString());
      setValue("numberOfQuestions", quizData.questions.length.toString());
      setValue("scorePerQuestion", quizData.score_per_question.toString());
      setValue("description", quizData.description);
      setSelectedDate(new Date(quizData.schadule));
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const editQuiz: SubmitHandler<QuizFormInputs> = async (data) => {
    try {
      const payload = {
        duration: parseInt(data.duration),
        score_per_question: parseFloat(data.scorePerQuestion),
        description: data.description,
        schadule: selectedDate?.toISOString(),
      };

      const result = await privateUserAxiosInstance.put(
        QUIZ_URLS.updateQuiz(id!),
        payload
      );
      toast.success(result.data.message);
    } catch (error: any) {
      console.error("Error updating quiz:", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <>
      <div className="flex items-center">
        <Link
          to="/dashboard/quizzes"
          className="font-medium hover:underline underline-offset-2 mx-2"
        >
          Quizzes
        </Link>
        <MdKeyboardDoubleArrowRight className="text-[#C5D86D] text-2xl" />
        <p className="mx-2">{quizDetails?.title}</p>
      </div>

      <div className="w-2/3">
        <div className="p-4 mt-6 border border-gray-300 rounded bg-white hover:shadow-lg">
          <form onSubmit={handleSubmit(editQuiz)}>
            <div className="title">
              <p className="mx-2 text-2xl font-bold">{quizDetails?.title}</p>
              <div className="flex items-center gap-2">
              <DatePickerDemo
  className="outline-0 border-0 sm:w-auto"
  showPlaceholder={false}
  value={selectedDate}
  onChange={setSelectedDate}
/>

                {selectedDate && (
                  <span>
                    {moment(selectedDate).format("DD/MM/YYYY hh:mm A")}
                  </span>
                )}
              </div>
            </div>

            {[
              {
                id: "duration",
                label: "Duration",
                registerKey: "duration",
              },
              {
                id: "numberOfQuestions",
                label: "Number of Questions",
                registerKey: "numberOfQuestions",
              },
              {
                id: "scorePerQuestion",
                label: "Score Per Question",
                registerKey: "scorePerQuestion",
              },
              {
                id: "description",
                label: "Description",
                registerKey: "description",
              },
            ].map(({ id, label, registerKey }) => (
              <div key={id} className="relative col-span-3 my-3">
                <label
                  htmlFor={id}
                  className="absolute w-38 left-0 top-0 text-sm bg-[#FFEDDF] text-black px-2 py-2 z-10 rounded"
                >
                  {label}
                </label>
                <Input
                  id={id}
                  className="pl-[160px] py-2"
                  {...register(registerKey as keyof QuizFormInputs, {
                    required: true,
                  })}
                />
              </div>
            ))}

            <button
              className="bg-[#0D1321] text-white p-2 rounded-2xl flex items-center gap-2"
              type="submit"
            >
              <FaPen />
              <span>Edit</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
