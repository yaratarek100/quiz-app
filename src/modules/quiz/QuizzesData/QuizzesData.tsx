import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { QUIZ_URLS } from "@/services/Urls";
import { Input } from "@/components/ui/input";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import moment from "moment";
import { Calendar24 } from "@/modules/shared/date-picker/date-picker";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";
import type { QuizData, QuizFormInputs } from "@/Interfaces/QuizInterface";

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
        <MdKeyboardDoubleArrowRight className="text-yellow-300 text-2xl" />
        <p className="mx-2">{quizDetails?.title}</p>
      </div>

      <div className=" xl:w-4/5">
        <div className="p-4 mt-6 border border-gray-300 rounded bg-white hover:shadow-lg">
          <form onSubmit={handleSubmit(editQuiz)}>
            <div className="title">
              <h3 className="mx-2 mt-3 mb-7 text-2xl font-bold">
                {quizDetails?.title}
              </h3>

              <div className="flex items-center gap-2">
                <Controller
                  name="schadule"
                  defaultValue={null}
                  render={({ field }) => (
                    <Calendar24
                      value={field.value ?? undefined}
                      onChange={field.onChange}
                    />
                  )}
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
                  className="absolute w-38 left-0 top-0 text-sm   px-2 py-2 z-10 rounded"
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
              className="bg-[#0D1321] text-white p-2 rounded-2xl flex items-center gap-2 ms-auto px-9 cursor-pointer mt-6"
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
