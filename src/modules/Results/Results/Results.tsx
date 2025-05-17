import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/Store";

export default function Results() {
  const [thisQuiz, setThisQuiz] = useState<any>(null);
  const quizzes = useSelector(
    (state: RootState) => state.completedQuizzes.quizzes
  );
  const { index } = useParams();

  useEffect(() => {
    if (index && quizzes && quizzes.length > 0) {
      const quizIndex = Number(index);
      setThisQuiz(quizzes[quizIndex]);
      console.log(quizzes[quizIndex]);
    }
  }, [index, quizzes]);

  return (
    <>
      <h1 className="text-2xl font-semibold my-3">
        <Link to="/dashboard/results" className="hover:text-lime-500">Quizzes</Link>
      <span className="mx-3 text-lime-400">{">>"}</span>
      {thisQuiz?.quiz?.title}
      </h1>
      
      <div className="p-4 py-1 pb-4 border rounded-md my-4">
        <h1 className="text-lg font-medium my-3 ">Results</h1>
        <Table className="border-separate border-spacing-y-2">
          <TableHeader>
            <TableRow>
              <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white rounded-s-sm">
                Student name
              </TableHead>
              <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white">
                score
              </TableHead>
              <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white">
                email
              </TableHead>
              <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white rounded-e-sm ">
                Time submitted
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {thisQuiz?.participants?.map((item: any) => (
              <TableRow key={item}>
                <TableCell className="border mb-1 rounded-s-sm">
                  {item.participant.first_name}
                </TableCell>
                <TableCell className="border mb-1 ">{item.score}</TableCell>
                <TableCell className="border mb-1 ">
                  {item.participant.email}
                </TableCell>
                <TableCell className="border mb-1 rounded-e-sm">
                  {item.finished_at.slice(11, 16)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
