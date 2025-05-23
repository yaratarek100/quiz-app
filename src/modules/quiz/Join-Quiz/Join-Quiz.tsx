import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { privateUserAxiosInstance } from "@/services/Axiosinstance"
import { QUIZ_URLS } from "@/services/Urls"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { FaCheck, FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import type { IFormData } from "@/Interfaces/QuizInterface"




export function JoinQuiz({ setOpenJoinQuiz, openJoinQuiz }: { setOpenJoinQuiz: (value: boolean) => void; openJoinQuiz: boolean }) {
  const { register, handleSubmit } = useForm<IFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: IFormData) => {
    try {
      const response = await privateUserAxiosInstance.post(QUIZ_URLS.joinQuiz, data);
      console.log(response.data.data.quiz);
      const id = response.data.data.quiz;
      toast.success(response.data.message);
      setOpenJoinQuiz(false);
      navigate(`/dashboard/quiz-interface/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error.response?.data.message || "Something Went Wrong");
      }
      setOpenJoinQuiz(false);
    }
  };

  return (
    <Dialog open={openJoinQuiz}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Join Quiz</DialogTitle>
          <p className="text-center">Input the code received for the quiz below to join</p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Group code */}
            <div className="relative col-span-3">
              <label
                htmlFor="code"
                className="absolute left-0 top-0 text-sm bg-[#FFEDDF] text-black px-2 py-2 z-10 rounded"
              >
                Code
              </label>
              <Input
                id="code"
                className="pl-[60px] py-2"
                {...register("code", { required: true })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="border border-gray-500 p-2 flex items-center space-x-0 mx-0 hover:bg-gray-100 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <FaCheck />
            </Button>
            <Button
              onClick={() => { setOpenJoinQuiz(false) }}
              className="border border-gray-500 p-2 flex items-center space-x-0 mx-0 hover:bg-gray-100 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <FaTimes />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
