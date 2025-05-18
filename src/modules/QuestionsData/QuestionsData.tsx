import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Save, X } from "lucide-react";
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
import { Button } from '@/components/ui/button';

interface IQuestionsPropsData {
  questionId?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const QuestionsData: React.FC<IQuestionsPropsData> = ({ questionId, onClose, onSuccess }) => {
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

  const { setValue, handleSubmit } = form;

  const isUpdate = !!questionId;

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

  const handleRequestError = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || "Something Went Wrong");
    } else if (error instanceof Error) {
      toast.error(error.message || "Something Went Wrong");
    } else {
      toast.error("Something Went Wrong");
    }
  };

  const onSubmit = async (values: IQuestionData) => {
    console.log("Form Submitted!", values); // Debug log
      // Remove _id from options before sending
  const { _id, ...cleanOptions } = values.options || {};
  const cleanValues = { ...values, options: cleanOptions };
    if (questionId) {
      await editQuestion(cleanValues); 
    } else {
      await addNewQuestion(cleanValues); 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isUpdate) {
        try {
          const response = await privateUserAxiosInstance.get(QUESTIONS_URLS.getQuestion(String(questionId)));
          const question = response.data;
          console.log(question)

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
    <Dialog open={true} onOpenChange={onClose}>
      {/* <DialogTrigger>
        <h3 className="text-lg font-semibold">{isUpdate ? "Update Question" : "New Question"}</h3>
      </DialogTrigger> */}
     
          <DialogContent className="w-full max-w-[90vw] md:max-w-[700px] lg:max-w-[800px] p-6">
          <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle className="w-full">
                <div className="flex w-full border-b border-gray-300 items-center">
                  <div className="w-9/12 p-4 flex items-center">
                    <h3>{isUpdate ? "Edit Question" : "Set up a new question"}</h3>
                  </div>
                  <div className="w-1/12 p-4 flex justify-center items-center">
                    <Button type="submit">
                      <Save size={80}/>
                    </Button>
                  </div>
                  <div className="w-1/12 p-4 flex justify-center items-center">
                    <X onClick={onClose} />
                  </div>
                </div>
              </DialogTitle>

              <div className="space-y-8">
                {/* Title Input */}
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description Textarea */}
                <FormField
                  control={form.control}
                  name="description"
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-8"> 
                {/* Answer Inputs: A, B, C, D */}
                <FormLabel>Options</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  {["A", "B", "C", "D"].map((option) => (
                    <FormField
                      key={option}
                      control={form.control}
                      name={`options.${option}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder={option} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>    

              {/* Right Answer & Category Select */}
              <FormLabel>Right Answer</FormLabel>
              <div className="flex gap-4 items-center w-full space-y-8">
              
                <FormField
                  control={form.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="answer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                            <SelectItem value="D">D</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>  
                <FormLabel>Category</FormLabel>
                <div className="flex gap-4 items-center w-full space-y-8">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FE">FE</SelectItem>
                            <SelectItem value="BE">BE</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Difficulty Select */}
              <FormLabel>Difficulty</FormLabel>
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                          
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogHeader>
            </form>
            </Form>
          </DialogContent>
  
    </Dialog>
  );
}

export default QuestionsData;