import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { FiX, FiCheck } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Calendar24 } from "@/modules/shared/date-picker/date-picker";
import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { GROUPS_URLS, QUIZ_URLS } from "@/services/Urls";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import CreatedSuccessfully from "@/modules/shared/Created-Successfully/CreatedSuccessfully";
import type { QuizFormValues, Group } from "@/Interfaces/QuizInterface";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/Redux/Store1";
import { closeModal } from "@/Redux/ModalSlice";

export default function QuizForm() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<QuizFormValues>({
    defaultValues: {},
  });

  const [groupsData, setGroupsData] = useState<Group[]>();
  const [createdCode, setCreatedCode] = useState("");
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const fetchGroups = async () => {
    try {
      const response = await privateUserAxiosInstance.get(
        GROUPS_URLS.getAllGroups
      );
      setGroupsData(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Something Went Wrong");
      }
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const onSubmit = async (data: QuizFormValues) => {
    if (!data.schadule)
      {
        return;
      } 

      let date1 =data.schadule.toISOString().slice(0, 19);
      console.log(date1);
        

   const fullData = {
  ...data,
  schadule: date1,
};

console.log(fullData);



    try {
      const response = await privateUserAxiosInstance.post(
        QUIZ_URLS.addQuiz,
        fullData
      );

      if (response.data?.data?.code) {
        setCreatedCode(response.data.data.code);
      }
      setOpenSuccessDialog(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Something Went Wrong");
      }
    }
  };

  const handleDialogClose = () => {
    dispatch(closeModal());
    reset(); // Reset the form when the dialog is closed
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleDialogClose()}>
      <DialogContent className="max-w-[900px]" hideClose={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl text-slate-700">
              Set up a new quiz
            </DialogTitle>
            <div className="flex items-center gap-5">
              <button
                type="submit"
                title="Submit Quiz"
                aria-label="Submit Quiz"
                className="text-black text-3xl font-bold cursor-pointer hover:opacity-30"
              >
                <FiCheck />
              </button>
              <button
                type="button"
                onClick={handleDialogClose}
                className="text-black text-3xl font-bold cursor-pointer hover:opacity-30"
              >
                <FiX />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="relative   my-2 p-0  col-span-3">
              <label
                htmlFor="title"
                className="font-bold absolute  left-0 top-0 text-sm   px-2 py-2 z-10 rounded"
              >
                Title:
              </label>
              <Input
                id="title"
                className="pl-[60px] py-2 w-full "
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2 ">
              <div className="relative  my-2 p-0  w-full md:w-[32%]">
                <label
                  htmlFor="duration"
                  className="font-bold absolute  left-0 top-0 text-sm  px-2 py-2 z-10 rounded"
                >
                  Duration (in minutes)
                </label>
                <Input
                  id="duration"
                  className="pl-[180px] py-2 w-full "
                  {...register("duration", {
                    required: "Duration is required",
                    pattern: {
                      value: /^\d+$/,
                      message: "Duration must be a number",
                    },
                  })}
                />
                {errors.duration && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              <div className="relative  my-2 p-0  w-full md:w-[32%]">
                <label className="font-bold absolute h-9 left-0 top-0 text-sm   px-2 py-2 z-10 rounded">
                  No. of Questions
                </label>
                <Controller
                  control={control}
                  name="questions_number"
                  rules={{ required: "Number of questions is required" }}
                  render={({ field }) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-9 pl-[140px] pr-[10px] py-2 border rounded flex justify-between items-center w-full ">
                        <span>{field.value || "Select"}</span>
                        <FaChevronDown />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="mt-2 max-h-[300px] overflow-y-auto">
                        {Array.from({ length: 100 }, (_, i) => (
                          <DropdownMenuItem
                            key={i + 1}
                            onClick={() => field.onChange(i + 1)}
                          >
                            {i + 1}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                />
                {errors.questions_number && (
                  <p className="text-red-500  mt-1 text-sm">
                    {errors.questions_number.message}
                  </p>
                )}
              </div>

              <div className="relative  my-2 p-0  w-full md:w-[32%]">
                <label
                  htmlFor="score_per_question"
                  className="font-bold absolute  left-0 top-0 text-sm   px-2 py-2 z-10 rounded"
                >
                  Score per Question
                </label>
                <Input
                  id="score_per_question"
                  className="pl-[150px]  w-full "
                  {...register("score_per_question", {
                    required: "Score is required",
                    pattern: {
                      value: /^\d+(\.\d+)?$/,
                      message: "Score must be a number",
                    },
                  })}
                />
                {errors.score_per_question && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.score_per_question.message}
                  </p>
                )}
              </div>
            </div>

            <div className="relative  my-2  p-0  col-span-3 ">
              <label
                htmlFor="description"
                className="font-bold absolute  left-0 top-0 text-sm   px-2 py-2 z-10 rounded"
              >
                Description
              </label>
              <Input
                id="description"
                className="pl-[110px]  w-full "
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="relative flex gap-4 my-3 mt-4  p-0 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] ">
              <label
                htmlFor="schadule"
                className="font-bold   left-0 -top-0 text-sm   px-2 py-2 z-10 rounded"
              >
                Schedule
              </label>
              <Controller
                control={control}
                name="schadule"
                rules={{ required: "Schedule is required" }}
                render={({ field }) => (
                  <Calendar24 value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.schadule && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.schadule.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2 ">
              <div className="relative  my-2 p-0  w-full md:w-[32%]">
                <label
                  htmlFor="difficulty"
                  className="font-bold absolute h-9 left-0 top-0 text-sm   px-2 py-2 z-10 rounded"
                >
                  Difficulty
                </label>
                <Controller
                  control={control}
                  name="difficulty"
                  rules={{ required: "Difficulty level is required" }}
                  render={({ field }) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-9 pl-[140px] pr-[10px] py-2 border rounded flex justify-between items-center w-full ">
                        <span>{field.value || "Select"}</span>
                        <FaChevronDown />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="mt-2 w-full ">
                        {["easy", "medium", "hard"].map((level) => (
                          <DropdownMenuItem
                            key={level}
                            onClick={() => field.onChange(level)}
                            className={
                              field.value === level
                                ? "bg-gray-100 font-bold"
                                : ""
                            }
                          >
                            {level}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                />
                {errors.difficulty && (
                  <p className="text-red-500 mt-1 text-sm ">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>

              <div className="relative  my-2 p-0  w-full md:w-[32%]">
                <label
                  htmlFor="type"
                  className="font-bold absolute h-9 left-0 top-0 text-sm   px-2 py-2 z-10 rounded"
                >
                  Category type
                </label>
                <Controller
                  control={control}
                  name="type"
                  rules={{ required: "Category type is required" }}
                  render={({ field }) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-9 pl-[140px]  pr-3 border rounded flex justify-between items-center w-full bg-white">
                        <span className="truncate">
                          {field.value || "Select"}
                        </span>
                        <FaChevronDown />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="mt-2 w-full ">
                        {["FE", "BE", "DO"].map((type) => (
                          <DropdownMenuItem
                            key={type}
                            onClick={() => field.onChange(type)}
                            className={
                              field.value === type
                                ? "bg-gray-100 font-bold"
                                : ""
                            }
                          >
                            {type}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                />
                {errors.type && (
                  <p className="text-red-500 mt-1 text-sm  ">
                    {errors.type.message}
                  </p>
                )}
              </div>
              <div className="relative  my-2 p-0  w-full md:w-[32%]">
                <label
                  htmlFor="type"
                  className="font-bold absolute h-9 left-0 top-0 text-sm   px-2 py-2 z-10 rounded"
                >
                  Group name
                </label>
                <Controller
                  control={control}
                  name="group"
                  rules={{ required: "Group name is required" }}
                  render={({ field }) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-9 pl-[140px] pr-3  border rounded flex justify-between items-center w-full bg-white">
                        <span className="truncate">
                          {field.value || "Select"}
                        </span>
                        <FaChevronDown />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="mt-2 w-full ">
                        {groupsData &&
                          groupsData.map((group) => (
                            <DropdownMenuItem
                              key={group._id}
                              onClick={() => field.onChange(group._id)}
                              className={
                                field.value === group._id
                                  ? "bg-gray-100 font-bold"
                                  : ""
                              }
                            >
                              {group.name}
                            </DropdownMenuItem>
                          ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                />
                {errors.group && (
                  <p className="text-red-500 mt-1 text-sm ">
                    {errors.group.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
      <CreatedSuccessfully
        code={createdCode}
        openSuccessDialog={openSuccessDialog}
        setOpenSuccessDialog={setOpenSuccessDialog}
        itemType="Quiz"
      />
    </Dialog>
  );
}
