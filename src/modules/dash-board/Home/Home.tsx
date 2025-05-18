import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { THEMECOLOR } from "@/services/ThemeColors";
import {
  Card,
} from "@/components/ui/card";
import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { QUIZ_URLS, STUDENTS_URLS } from "@/services/Urls";
import { useEffect, useState } from "react";
import avatar from "../../../assets/images/avatar2.png"
import quizImg from "../../../assets/images/Quiz img.png"

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
  const [loading, setLoading] = useState<boolean>(false);

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
      setQuizzes(latestFive);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getTopStudents();
    getTopQuizzes()
  }, []);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Left Section */}
      <div className="w-full border border-gray-300 p-4 m-2 rounded-lg">
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

        {/* quizzes Cards Container */}
        <div className="flex flex-col gap-2 w-full">
          {quizzes?.length > 0 ? (
            quizzes.map((quiz, index) => (
              <Card key={index} className="w-full p-2">
                <div className="w-full bg-white shadow-md rounded-lg overflow-hidden h-20 flex items-center">
                  {/* Image Section */}
                  <img
                    src={quizImg}
                    alt={`quiz ${quiz.title}`}
                    className="w-16 h-16 object-cover rounded-full"
                  />

                  {/* Text Section */}
                  <div className="px-3 flex flex-col justify-center w-full">
                    <h2 className="text-sm font-semibold">{quiz.title}</h2>
                    <p className="text-gray-500 text-xs">Code: {quiz?.code}</p>
                    <p className="text-gray-500 text-xs">Difficulty: {quiz?.difficulty}</p>
                    <p className="text-gray-500 text-xs">Duration: {quiz?.duration}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            !loading && <p className="text-center text-gray-500">No quizzes found.</p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full border border-gray-300 p-4 m-2 rounded-lg">
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

        {/* Student Cards Container */}
        <div className="flex flex-col gap-2 w-full">
          {students?.length > 0 ? (
            students.map((student, index) => (
              <Card key={index} className="w-full p-2">
                <div className="w-full bg-white shadow-md rounded-lg overflow-hidden h-20 flex items-center">
                  {/* Image Section */}
                  <img
                    src={avatar}
                    alt={`Student ${student.first_name}`}
                    className="w-16 h-16 object-cover rounded-full"
                  />

                  {/* Text Section */}
                  <div className="px-3 flex flex-col justify-center w-full">
                    <h2 className="text-sm font-semibold">{student.first_name}</h2>
                    <p className="text-gray-500 text-xs">Group: {student?.group?.name || "---"}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            !loading && <p className="text-center text-gray-500">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
