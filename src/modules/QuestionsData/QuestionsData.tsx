import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FiCheck, FiX } from 'react-icons/fi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IQuestionData } from "@/Interfaces/QuestionData";
import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { QUESTIONS_URLS } from "@/services/Urls";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AxiosError } from 'axios';

interface IQuestionsPropsData {
  questionId?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const QuestionsData: React.FC<IQuestionsPropsData> = ({ questionId, onClose, onSuccess }) => {
  const [openDialog, setOpenDialog] = useState(true);

  const form = useForm<IQuestionData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      options: { A: "", B: "", C: "", D: "" },
      answer: "",
      type: "",
      difficulty: "",
    }
  });

  const { setValue, handleSubmit, reset } = form;
  const isUpdate = !!questionId;

  const handleRequestError = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } else if (error instanceof Error) {
      toast.error(error.message || "Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
  };

  const addNewQuestion = async (values: IQuestionData) => {
    try {
      const { data } = await privateUserAxiosInstance.post(
        QUESTIONS_URLS.addQuestion,
        values
      );
      toast.success(data?.message);
      onSuccess();
    } catch (error) {
      handleRequestError(error);
    }
  };

  const editQuestion = async (values: IQuestionData) => {
    try {
      const { data } = await privateUserAxiosInstance.put(
        QUESTIONS_URLS.editQuestion(String(questionId)),
        values
      );
      toast.success(data?.message);
      onSuccess();
    } catch (error) {
      handleRequestError(error);
    }
  };

  const onSubmit = async (values: IQuestionData) => {
    const { _id, ...cleanOptions } = values.options || {};
    const cleanValues = { ...values, options: cleanOptions };

    if (questionId) {
      await editQuestion(cleanValues);
    } else {
      await addNewQuestion(cleanValues);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    reset();
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isUpdate) {
        try {
          const response = await privateUserAxiosInstance.get(QUESTIONS_URLS.getQuestion(String(questionId)));
          const question = response.data;
          if (question) {
            setValue("title", question?.title);
            setValue("description", question?.description);
            setValue("options", question?.options);
            setValue("answer", question?.answer);
            setValue("type", question?.type);
            setValue("difficulty", question?.difficulty);
          }
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'An unexpected error occurred.');
        }
      }
    };
    fetchData();
  }, [setValue, questionId, isUpdate]);

  return (
    <Dialog open={openDialog} onOpenChange={(open) => !open && handleDialogClose()}  >
 
      <DialogContent
       hideClose={true}
        className="w-full max-w-[90vw] md:max-w-[700px] lg:max-w-[800px] p-6 [&>[data-radix-dialog-close]]:text-white"
      >


        
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle>{isUpdate ? "Edit Question" : "Set up a new question"}</DialogTitle>
                <div className="flex items-center gap-5">
                  <button type="submit" title="Submit" className="text-black cursor-pointer hover:opacity-50 text-3xl font-bold">
                    <FiCheck />
                  </button>
                  <button type="button" onClick={handleDialogClose} className="text-black cursor-pointer hover:opacity-50 text-3xl font-bold">
                    <FiX />
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: "Title is required" }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="relative">
                        <span className="absolute left-0 top-0 bottom-0 flex items-center px-2 bg-[#FFEDDF] text-sm font-bold text-black z-10 rounded-l">
                          Title
                        </span>
                        <FormControl>
                          <Input className={`pl-[70px] ${fieldState.invalid ? "border-red-500" : ""}`} {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  rules={{ required: "Description is required" }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="relative">
                        <span className="absolute left-0 top-0 bottom-0 flex items-center px-2 bg-[#FFEDDF] text-sm font-bold text-black z-10 rounded-l">
                          Description
                        </span>
                        <FormControl>
                          <Textarea className={`pl-[110px] ${fieldState.invalid ? "border-red-500" : ""}`} {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Options A-D */}
                <FormItem className="w-full mt-4">
                  <FormLabel className="text-sm font-bold text-black bg-[#FFEDDF] px-2 py-1 rounded">Options</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {["A", "B", "C", "D"].map((option) => (
                      <FormField
                        key={option}
                        control={form.control}
                        name={`options.${option}` as `options.A` | `options.B` | `options.C` | `options.D`}
                        rules={{ required: `Option ${option} is required` }}
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <div className="relative">
                              <span className="absolute left-0 top-0 bottom-0 flex items-center px-2 bg-[#FFEDDF] text-sm font-bold text-black z-10 rounded-l">
                                {option}
                              </span>
                              <FormControl>
                                <Input className={`pl-[70px] ${fieldState.invalid ? "border-red-500" : ""}`} {...field} />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>

                {/* Answer */}
                <FormField
                  control={form.control}
                  name="answer"
                  rules={{ required: "Correct answer is required" }}
                  render={({ field, fieldState }) => (
                    <FormItem className="w-full mt-4">
                      <div className="relative">
                        <span className="absolute left-0 top-0 bottom-0 flex items-center px-2 bg-[#FFEDDF] text-sm font-bold text-black z-10 rounded-l">Right Answer</span>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={`w-full pl-[120px] ${fieldState.invalid ? "border-red-500" : ""}`}>
                              <SelectValue  />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A">A</SelectItem>
                              <SelectItem value="B">B</SelectItem>
                              <SelectItem value="C">C</SelectItem>
                              <SelectItem value="D">D</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="type"
                  rules={{ required: "Category is required" }}
                  render={({ field, fieldState }) => (
                    <FormItem className="w-full mt-4">
                      <div className="relative">
                        <span className="absolute left-0 top-0 bottom-0 flex items-center px-2 bg-[#FFEDDF] text-sm font-bold text-black z-10 rounded-l">Category</span>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={`w-full pl-[100px] ${fieldState.invalid ? "border-red-500" : ""}`}>
                              <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="FE">FE</SelectItem>
                              <SelectItem value="BE">BE</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Difficulty */}
                <FormField
                  control={form.control}
                  name="difficulty"
                  rules={{ required: "Difficulty is required" }}
                  render={({ field, fieldState }) => (
                    <FormItem className="w-full mt-4">
                      <div className="relative">
                        <span className="absolute left-0 top-0 bottom-0 flex items-center px-2 bg-[#FFEDDF] text-sm font-bold text-black z-10 rounded-l">Difficulty</span>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={`w-full pl-[100px] ${fieldState.invalid ? "border-red-500" : ""}`}>
                              <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </DialogHeader>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionsData;
