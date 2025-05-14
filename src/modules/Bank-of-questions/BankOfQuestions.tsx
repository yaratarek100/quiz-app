import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { QUESTIONS_URLS } from "@/services/Urls";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { QuestionI } from "@/Interfaces/QuizInterface";

import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { GrAdd } from "react-icons/gr";

import DeleteConfirmation from "@/modules/shared/Delet-Confirmation/Delet-Confirmation";

export default function Questions() {
  const [questionData, setQuestionData] = useState<QuestionI | null>(null);
  const [questions, setQuestions] = useState<QuestionI[] | null>(null);
  const [openDeletion, setOpenDeletion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>();


  const getQuestions = async () => {
    try {
      const { data } = await privateUserAxiosInstance.get(
        QUESTIONS_URLS.getAllQuestions
      );
      setQuestions(data);
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const message =
          (axiosError.response.data as any)?.message ||
          `Error ${axiosError.response.status}: ${axiosError.response.statusText}`;
        toast.error(message);
      } else if (axiosError.request) {
        toast.error("No response from server. Please check your network.");
      } else {
        toast.error(axiosError.message || "Unexpected error occurred.");
      }
    }
  };

    const handleDelete = async (selectedQuestion: string) => {
      if (!selectedQuestion) return;
      try {
        const response = await privateUserAxiosInstance.delete(
          QUESTIONS_URLS.deleteQuestion(selectedQuestion)
        );
        toast.success("Group deleted successfully");
        getQuestions();
        setOpenDeletion(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message || "Something Went Wrong");
        }
      }
    };

  function handelView(id: string) {
    setSelectedQuestion(id);
    setOpenView(true);

  }
  function handleDeleteClick(id: string) {
    setSelectedQuestion(id);
    setOpenDeletion(true);
  };


  function handelEdit(id: string) {
    
  }



  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="p-4 py-1 pb-4 border rounded-md my-4">
      <div className="flex flex-1 justify-between  items-center px-4">
        <h1 className="text-lg font-medium my-3 ">Bank Of Questions</h1>

        <div className="border border-gray-500 p-2 rounded-full px-4 flex items-center space-x-2 cursor-pointer">
          <GrAdd className="text-2xl" />
          <h3 className="text-lg font-semibold  ">New Question</h3>{" "}
          {/* open question form modal */}
        </div>
      </div>
      <Table className="border-separate border-spacing-y-2">
        <TableHeader>
          <TableRow>
            <TableHead className=" bg-slate-800 border-slate-50 border-r-4 rounded-s-sm text-white">
              Title
            </TableHead>
            <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white">
              Description
            </TableHead>
            <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white">
              difficulty level
            </TableHead>
            <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white">
              status
            </TableHead>
            <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {questions?.map((question: QuestionI) => (
            <TableRow key={question._id} className=" ">
              <TableCell className="border mb-1 rounded-s-sm max-w-60 overflow-hidden">
                {question.title}
              </TableCell>
              <TableCell className="border mb-1  max-w-60 overflow-hidden ">
                {question.description}
              </TableCell>
              <TableCell className="border mb-1 ">
                {question.difficulty}
              </TableCell>
              <TableCell className="border mb-1 w-fit ">{question.status}</TableCell>
              <TableCell className="border mb-1 rounded-e-sm">
                <div className="flex text-orange-300 text-lg gap-1 ">
                  
                  <FaEye className="cursor-pointer" />
                  <CiEdit  className="cursor-pointer"/>
                  <MdDelete 
                    onClick={() => handleDeleteClick(question._id)}
                     className="cursor-pointer" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

         <DeleteConfirmation
        openDialog={openDeletion}
        setOpenDialog={setOpenDeletion}
        itemType="Group"
        handleDelete={() => selectedQuestion && handleDelete(selectedQuestion)}
      />
    </div>
  );
}
