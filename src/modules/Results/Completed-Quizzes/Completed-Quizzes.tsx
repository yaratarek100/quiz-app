import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { GROUPS_URLS, QUIZ_URLS } from "@/services/Urls";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { IAppState, QuizI } from "@/Interfaces/QuizInterface";
import { useDispatch } from "react-redux";
import { setCompletedQuizzes } from "../../../Redux/ResultSlice";
import { useSelector } from "react-redux";

export default function CompletedQuizzes2() {
  const loginData = useSelector(
    (state: IAppState) => state.AuthReduceer.loginData
  );
  const [completedQuizzes, setCompletedQuizzess] = useState<QuizI[] | null>(
    null
  );
  const [groups, setGroups] = useState<{
    [key: string]: { name: string; noOfStudents: number };
  }>({});

  const dispatch = useDispatch();

  const getCompletedQuizzes = async () => {
    try {
      const { data } = await privateUserAxiosInstance.get(
        QUIZ_URLS.getAllQuizzesResults
      );
      setCompletedQuizzess(data);
      dispatch(setCompletedQuizzes(data));
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

  const fetchGroupDetails = async (groupId: string) => {
    try {
      if (groups[groupId]) return;

      const { data } = await privateUserAxiosInstance.get(
        GROUPS_URLS.getGroup(groupId)
      );
      setGroups((prev) => ({
        ...prev,
        [groupId]: {
          name: data.name,
          noOfStudents: data.students?.length || 0,
        },
      }));
    } catch (error) {
      console.log(error); 
    }
  };

  function handelView(quizIndex: number) {
    navigate(`/dashboard/view-results/${quizIndex}`);
  }
  const navigate = useNavigate();
  useEffect(() => {
    getCompletedQuizzes();
  }, []);
  useEffect(() => {
    if (loginData.role !== "Student") { 
      completedQuizzes?.forEach((quiz) => {
        fetchGroupDetails(quiz?.quiz?.group);
      });
    }
  }, [completedQuizzes]);

  return (
    <div className="p-4 py-1 pb-4 border rounded-md my-4">
      <h1 className="text-lg font-medium my-3 ">Completed Quizzes</h1>
      {loginData.role === "Student" ? (
        <Table className="border-separate border-spacing-y-2">
          <TableHeader>
            <TableRow>
              <TableHead className="bg-slate-800 border-slate-50 border-r-4 text-white rounded-s-sm">
                Quiz Title
              </TableHead>
              <TableHead className="bg-slate-800 border-slate-50 border-r-4 text-white">Type</TableHead>
              <TableHead className="bg-slate-800 border-slate-50 border-r-4 text-white">
                Difficulty
              </TableHead>
              <TableHead className="bg-slate-800 border-slate-50 border-r-4 text-white">
                No. of questions
              </TableHead>
              <TableHead className="text-right bg-slate-800 border-slate-50  rounded-e-sm text-white w-20">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {completedQuizzes?.map((item: any) => {
              const { quiz, result } = item;

              return (
                <TableRow key={quiz._id}>
                  <TableCell className="border">{quiz.title}</TableCell>
                  <TableCell className="border">{quiz.type}</TableCell>
                  <TableCell className="border capitalize">
                    {quiz.difficulty}
                  </TableCell>
                  <TableCell className="border">
                    {quiz.questions_number}
                  </TableCell>
                  <TableCell className="border">{result.score}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <Table className="border-separate border-spacing-y-2">
          <TableHeader>
            <TableRow>
              <TableHead className=" bg-slate-800 border-slate-50 border-r-4 rounded-s-sm text-white">
                Title
              </TableHead>
              <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white">
                Group name
              </TableHead>
              <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white">
                No. of persons in group
              </TableHead>
              <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white">
                Participants
              </TableHead>
              <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white">
                Date
              </TableHead>
              <TableHead className="text-right bg-slate-800 border-slate-50  rounded-e-sm text-white w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {completedQuizzes?.map((quiz: QuizI, index: number) => {
              return (
                <TableRow key={quiz?.quiz?._id} className=" ">
                  <TableCell className="border mb-1 rounded-s-sm">
                    {quiz?.quiz?.title}
                  </TableCell>
                  <TableCell className="border mb-1 ">
                    {groups[quiz?.quiz?.group]?.name || "Loading..."}
                  </TableCell>

                  <TableCell className="border mb-1 ">
                    {groups[quiz?.quiz?.group]?.noOfStudents ?? "-"}
                  </TableCell>
                  <TableCell className="border mb-1 ">
                    {quiz?.participants?.length}
                  </TableCell>
                  <TableCell className="border mb-1 ">
                    {quiz?.quiz?.createdAt?.slice(0, 10)}
                  </TableCell>
                  <TableCell className="border mb-1 rounded-e-sm">
                    <div
                      className="rounded-3xl bg-yellow-300 p-1 text-white text-center cursor-pointer"
                      onClick={() => {
                        handelView(index);
                      }}
                    >
                      View
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
