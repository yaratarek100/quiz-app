import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { QUIZ_URLS, STUDENTS_URLS } from "@/services/Urls";
import { useEffect, useState } from "react";
import avatar from "../../../assets/images/avatar2.png";
import { useSelector } from "react-redux";

import type { RootState } from "@/Redux/Store1";
import type { IStudent } from "../../../Interfaces/StudentsInteface";
import QuizPage from "@/modules/quiz/Quiz-Page/Quiz-Page";

export default function Home() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const userData = useSelector(
    (state: RootState) => state.AuthReduceer.loginData
  );

  const getTopStudents = async () => {
    try {
      setLoading(true);
      const response = await privateUserAxiosInstance.get(
        STUDENTS_URLS.allStudents
      );

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

 


useEffect(() => {
  if (userData?.role === "Instructor") {
    getTopStudents();
  } 
}, []);

  return (
    <div className="text-align-right">
  

      <div className="flex flex-col-reverse md:flex-row gap-6 ">

        <QuizPage/>
        {/* Right Section - Top Students */}
        {userData?.role == "Instructor" ? (
          <div className="w-full border border-gray-300 p-6 rounded-lg shadow-md ">
            <div className="flex justify-between">
              <h6 className="text-lg font-bold my-5">Top 5 Students</h6>
              <div className="flex justify-end items-center px-4">
                <Link to="/dashboard/students">
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-semibold text-yellow-300">All Students</span>
                    <FaArrowRightLong
                      className="text-xl text-yellow-300"
                    />
                  </div>
                </Link>
              </div>
            </div>
            {/* Student Cards */}
            <div className="flex flex-col gap-3 w-full">
              {students?.length > 0
                ? students.map((student, index) => (
                    <div
                      key={index}
                      className="w-full bg-white shadow-md rounded-lg overflow-hidden h-20 flex items-center"
                    >
                      <img
                        src={avatar}
                        alt={`Student ${student.first_name}`}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <div className="px-3 flex flex-col justify-center w-full">
                        <h2 className="text-sm font-semibold">
                          {student.first_name}
                        </h2>
                        <p className="text-gray-500 text-xs">
                          Group: {student?.group?.name || "---"}
                        </p>
                      </div>
                    </div>
                  ))
                : !loading && (
                    <p className="text-center text-gray-500">
                      No students found.
                    </p>
                  )}
            </div>
          </div>
        ) : (
          null
         

        )}
      </div>
    </div>
  );
}
