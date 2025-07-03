import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { FiX, FiCheck } from "react-icons/fi";
import { FaChevronDown, FaClock } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { DatePickerDemo } from "@/modules/shared/date-picker/date-picker";
import TimePicker from "react-time-picker";
import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { GROUPS_URLS, QUIZ_URLS } from "@/services/Urls";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import CreatedSuccessfully from "@/modules/shared/Created-Successfully/CreatedSuccessfully";
import type{ QuizFormValues,Group } from "@/Interfaces/QuizInterface";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/Redux/Store1";
import { closeModal } from "@/Redux/ModalSlice";

export default function QuizForm() {

  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);




  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<QuizFormValues>({
    defaultValues: {},
  });

  const [groupsData, setGroupsData] = useState<Group[]>();
  const [time, setTime] = useState<string | null>("10:22");
  const [selectedDate, _setSelectedDate] = useState<Date | null>(new Date());
  const [createdCode, setCreatedCode] = useState("");
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const fetchGroups = async () => {
    try {
      const response = await privateUserAxiosInstance.get(GROUPS_URLS.getAllGroups);
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
    if (!time || !selectedDate) return;

    const [hours, minutes] = time.split(":").map(Number);
    const scheduleDate = new Date(selectedDate);
    scheduleDate.setHours(hours);
    scheduleDate.setMinutes(minutes);

    const fullData = {
      ...data,
      schadule: scheduleDate.toISOString(),
    };

    try {
      const response = await privateUserAxiosInstance.post(QUIZ_URLS.addQuiz, fullData);
      
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
    dispatch(closeModal())
    reset(); // Reset the form when the dialog is closed
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleDialogClose()} >
      <DialogContent className="max-w-[900px]" hideClose={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <DialogTitle>Set up a new quiz</DialogTitle>
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

          <DialogDescription className="mt-4">
            <h1 className="text-xl text-black font-bold">Details</h1>

            <div className="relative col-span-3">
              <label
                htmlFor="title"
                className="font-bold absolute left-0 top-0 text-sm bg-[#cdfa93]  text-black px-2 py-2 z-10 rounded"
              >
                Title:
              </label>
              <Input
                id="title"
                className="pl-[60px] py-2 w-full"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 my-4">
              <div className="relative w-full md:w-[32%]">
                <label
                  htmlFor="duration"
                  className="font-bold absolute left-0 top-0 text-sm bg-[#cdfa93] text-black px-2 py-2 z-10 rounded"
                >
                  Duration (in minutes)
                </label>
                <Input
                  id="duration"
                  className="pl-[180px] py-2 w-full"
                  {...register("duration", {
                    required: "Duration is required",
                    pattern: {
                      value: /^\d+$/,
                      message: "Duration must be a number",
                    },
                  })}
                />
                {errors.duration && (
                  <span className="text-red-500 text-sm">
                    {errors.duration.message}
                  </span>
                )}
              </div>

              <div className="relative w-full md:w-[32%]">
                <label className="font-bold absolute left-0 top-0 text-sm bg-[#cdfa93]  text-black px-2 py-2 z-10 rounded">
                  No. of Questions
                </label>
                <Controller
                  control={control}
                  name="questions_number"
                  rules={{ required: "Number of questions is required" }}
                  render={({ field }) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="pl-[140px] pr-[10px] py-2 border rounded flex justify-between items-center w-full">
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
                  <p className="text-red-600 text-sm mt-1 ">
                    {errors.questions_number.message}
                  </p>
                )}
              </div>

              <div className="relative w-full md:w-[32%]">
                <label
                  htmlFor="score_per_question"
                  className="font-bold absolute left-0 top-0 text-sm bg-[#cdfa93]  text-black px-2 py-2 z-10 rounded"
                >
                  Score per Question
                </label>
                <Input
                  id="score_per_question"
                  className="pl-[150px] py-2 w-full"
                  {...register("score_per_question", {
                    required: "Score is required",
                    pattern: {
                      value: /^\d+(\.\d+)?$/,
                      message: "Score must be a number",
                    },
                  })}
                />
                {errors.score_per_question && (
                  <span className="text-red-500 text-sm">
                    {errors.score_per_question.message}
                  </span>
                )}
              </div>
            </div>

            <div className="relative col-span-3 my-4">
              <label
                htmlFor="description"
                className="font-bold absolute left-0 top-0 text-sm bg-[#cdfa93]  text-black px-2 py-2 z-10 rounded"
              >
                Description:
              </label>
              <Input
                id="description"
                className="pl-[110px] py-2 w-full"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]">
              <label
                htmlFor="schedule"
                className="font-bold absolute left-0 -top-0 text-sm bg-[#cdfa93]  text-black px-2 py-2 z-10 rounded"
              >
                Schedule
              </label>
              <div className="flex items-center border border-gray-300 rounded-md w-full px-2 gap-4 bg-white pl-[70px]">
                <DatePickerDemo  className="outline-0 border-0 sm:w-auto" />
                <div className="flex items-center justify-center sm:w-auto">
                  <FaClock className="mr-2 h-6 w-6 text-black" />
                  <TimePicker
                    onChange={(value) => setTime(value)}
                    value={time}
                    disableClock={false}
                    clearIcon={null}
                    clockIcon={null}
                    className="w-full text-center text-black font-bold"
                    format="h:mm a"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 my-4">
              <div className="relative w-full md:w-[32%]">
                <label
                  htmlFor="difficulty"
                  className="font-bold absolute left-0 top-0 text-sm bg-[#cdfa93]  text-black px-2 py-2 z-10 rounded"
                >
                  Difficulty
                </label>
                <Controller
                  control={control}
                  name="difficulty"
                  rules={{ required: "Difficulty level is required" }}
                  render={({ field }) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="pl-[140px] pr-[10px] py-2 border rounded flex justify-between items-center w-full">
                        <span>{field.value || "Select"}</span>
                        <FaChevronDown />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="mt-2 w-full">
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
                  <p className="text-red-600 text-sm mt-1 ">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>

              <div className="relative w-full md:w-[32%]">
                <label
                  htmlFor="type"
                  className="font-bold absolute left-0 top-0 text-sm bg-[#cdfa93]  text-black px-2 py-2 z-10 rounded"
                >
                  Category type
                </label>
                <Controller
                  control={control}
                  name="type"
                  rules={{ required: "Category type is required" }}
                  render={({ field }) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="pl-[140px] pr-4 py-2 border rounded flex justify-between items-center w-full bg-white">
                        <span className="truncate">
                          {field.value || "Select"}
                        </span>
                        <FaChevronDown />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="mt-2 w-full">
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
                  <p className="text-red-600 text-sm mt-1 ">
                    {errors.type.message}
                  </p>
                )}
              </div>
              <div className="relative w-full md:w-[32%]">
                <label
                  htmlFor="type"
                  className="font-bold absolute left-0 top-0 text-sm bg-[#cdfa93]  text-black px-2 py-2 z-10 rounded"
                >
                  Group name
                </label>
                <Controller
                  control={control}
                  name="group"
                  rules={{ required: "Group name is required" }}
                  render={({ field }) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="pl-[140px] pr-4 py-2 border rounded flex justify-between items-center w-full bg-white">
                        <span className="truncate">
                          {field.value || "Select"}
                        </span>
                        <FaChevronDown />
                      </DropdownMenuTrigger>
                     <DropdownMenuContent className="mt-2 w-full">
                      {groupsData && groupsData.map((group) => (
                        <DropdownMenuItem
                          key={group._id}
                          onClick={() => field.onChange(group._id)}
                          className={
                            field.value === group._id ? "bg-gray-100 font-bold" : ""
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
                  <p className="text-red-600 text-sm mt-1 ">
                    {errors.group.message}
                  </p>
                )}
              </div>
            </div>
          </DialogDescription>
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


