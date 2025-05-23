import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { THEMECOLOR } from "@/services/ThemeColors";
import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { QUIZ_URLS, STUDENTS_URLS } from "@/services/Urls";
import { useEffect, useState } from "react";
import avatar from "../../../assets/images/avatar2.png"
import { useSelector } from "react-redux";
import { IoIosAlarm } from "react-icons/io";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RootState } from "@/redux/Store";
import quizImg from "../../../assets/images/Quick links.png";

interface IStudent {
  "_id": string,
  "first_name": string,
  "last_name": string,
  "email": string,
  "status": boolean,
  "role": string,
  "group": {
      "_id": string
      "name": string
      "status": boolean,
      "instructor": string,
      "students": [
        string
      ],
      "max_students": number,
      "updatedAt": string,
      "createdAt": string,
      "__v": 0
  }
}

interface IQuiz{
  "code": string,
  "title": string,
  "description": string,
  "status": boolean,
  "instructor": string,
  "group": string,
  "questions_number": number,
  "questions": [
      string
  ],
  "schadule": string,
  "duration": number,
  "score_per_question": number,
  "type": string,
  "difficulty": string,
  "_id": string,
  "updatedAt": string,
  "createdAt": string,
  "__v": 0
}
export default function Home() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [completeQuizzes, setCompleteQuizzes] = useState<IQuiz[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const userData = useSelector((state:RootState) => state.AuthReduceer.loginData);

  const getTopStudents = async () => {
    try {
      setLoading(true);
      const response = await privateUserAxiosInstance.get(STUDENTS_URLS.allStudents);

      // Get last 5 students in reverse order
      const latestFive = Array.isArray(response?.data)
        ? response?.data.slice(-5).reverse()
        : [];
      setStudents(latestFive);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getTopQuizzes = async () => {
    try {
      setLoading(true);
      const response = await privateUserAxiosInstance.get(QUIZ_URLS.getAll);

      // Get last 5 students in reverse order
      const latestFive = Array.isArray(response?.data)
        ? response?.data.slice(-5).reverse()
        : [];
        console.log(latestFive)
      setQuizzes(latestFive);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getFiveCompleteQuizzes = async () => {
    try {
      setLoading(true);
      const response = await privateUserAxiosInstance.get(QUIZ_URLS.getAllCompletedQuizzes);
      
      console.log(response);
      setCompleteQuizzes(response?.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getTopStudents();
    getTopQuizzes()
    getFiveCompleteQuizzes()
  }, []);

  return (
<div className="text-align-right">
  {/* New Quiz Section - Moved to the Right */}
  <div className="flex justify-start p-6">
    {userData?.role === "Student" && (
      <Link to="/">
          <img src={quizImg}/>
      </Link>
    )}
  </div>

  {/* Upcoming Quizzes & Students Sections */}
  <div className="flex flex-col-reverse md:flex-row gap-6">
    {/* Left Section - Upcoming Quizzes */}
    <div className="w-full border border-gray-300 p-6 rounded-lg shadow-md">
      <div className="flex justify-between">
        <h6 className="text-lg font-bold my-5">Upcoming 5 quizzes</h6>
        <div className="flex justify-end items-center px-4">
          <Link to="/dashboard/quizzes">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">Quiz Directory</span>
              <FaArrowRightLong style={{ color: THEMECOLOR.lightGreen }} className="text-2xl" />
            </div>
          </Link>
        </div>
      </div>
      {/* Quizzes Cards */}
      <div className="flex flex-col gap-3 w-full">
        {quizzes?.length > 0 ? (
          quizzes.map((quiz, index) => (
            // <Card  className="w-full p-3">
              <div key={index} className="w-full bg-white shadow-md rounded-lg overflow-hidden h-20 flex items-center">
                <img src={quizImg} alt={`quiz ${quiz.title}`} className="w-16 h-16 object-cover rounded-full" />
                <div className="px-3 flex flex-col justify-center w-full">
                  <h2 className="text-sm font-semibold">{quiz.title}</h2>
                  <p className="text-gray-500 text-xs">Code: {quiz?.code}</p>
                  <p className="text-gray-500 text-xs">Difficulty: {quiz?.difficulty}</p>
                  <p className="text-gray-500 text-xs">Duration: {quiz?.duration}</p>
                </div>
              </div>
            //</Card>
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No quizzes found.</p>
        )}
      </div>
    </div>

    {/* Right Section - Top Students */}
    {userData?.role == "Instructor"?
    (<div className="w-full border border-gray-300 p-6 rounded-lg shadow-md">
      <div className="flex justify-between">
        <h6 className="text-lg font-bold my-5">Top 5 Students</h6>
        <div className="flex justify-end items-center px-4">
          <Link to="/dashboard/quizzes">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">All Students</span>
              <FaArrowRightLong style={{ color: THEMECOLOR.lightGreen }} className="text-2xl" />
            </div>
          </Link>
        </div>
      </div>
      {/* Student Cards */}
      <div className="flex flex-col gap-3 w-full">
        {students?.length > 0 ? (
          students.map((student, index) => (
            // <Card  className="w-full p-3">
              <div key={index} className="w-full bg-white shadow-md rounded-lg overflow-hidden h-20 flex items-center">
                <img src={avatar} alt={`Student ${student.first_name}`} className="w-16 h-16 object-cover rounded-full" />
                <div className="px-3 flex flex-col justify-center w-full">
                  <h2 className="text-sm font-semibold">{student.first_name}</h2>
                  <p className="text-gray-500 text-xs">Group: {student?.group?.name || "---"}</p>
                </div>
              </div>
            //</Card> 
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No students found.</p>
        )}
      </div>
    </div>) :(



<div className="w-full border border-gray-300 p-6 rounded-lg shadow-md">
      <div className="flex justify-between">
        <h6 className="text-lg font-bold my-5">Complete Quizzes</h6>
      </div>
      {/* Results Cards */}
      <div className="flex flex-col gap-3 w-full">

        <Table className="border-separate border-spacing-y-2">
        <TableHeader>
          <TableRow>
            <TableHead className=" bg-slate-800 border-slate-50 border-r-4 rounded-s-sm text-white">
              Title
            </TableHead>
            <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white">
              Code
            </TableHead>
            <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white">
              Difficulty
            </TableHead>
            <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white">
            Group name 
            </TableHead>
            <TableHead className=" bg-slate-800 border-slate-50 border-r-4 text-white">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {completeQuizzes?.map((completeQuiz: IQuiz) => (
            <TableRow key={completeQuiz._id} className=" ">
              <TableCell className="border mb-1 rounded-s-sm max-w-60 overflow-hidden">
                {completeQuiz.title}
              </TableCell>
              <TableCell className="border mb-1  max-w-60 overflow-hidden ">
                {completeQuiz.code}
              </TableCell>
              <TableCell className="border mb-1 ">
                {completeQuiz.difficulty}
              </TableCell>
              <TableCell className="border mb-1 ">
                {completeQuiz.group}
              </TableCell>
              
              <TableCell className="border mb-1 w-fit ">
                {completeQuiz.updatedAt}
              </TableCell>
  
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>




    )}
  </div>
</div>


  );
}


 