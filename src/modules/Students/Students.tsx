import { useGetStudentsQuery } from "@/Redux/apis";
import LoadingScreen from "../shared/Loading-Screen/Loading-Screen";
import img1 from "../../assets/images/user img (1).png";
import img2 from "../../assets/images/user img (2).png";
import img3 from "../../assets/images/user img.png";
import { FaCircleArrowRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { ModalStudent } from "./ModalStudent";
import { useState } from "react";
import type { Student } from "@/Interfaces/StudentsInteface";

export default function Students() {
  const { data, isLoading } = useGetStudentsQuery();
  const imgs = [img1, img2, img3];
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (student: Student) => {
    setOpen(true);
    setSelectedStudent(student);
  };

  if (isLoading) return <LoadingScreen />;
  return (
    <>
      <div className="border border-[rgba(0, 0, 0, 0.2)] rounded-md p-5">
        <h3 className="text-[rgba(0, 0, 0, 1)] text-[20px]">Students list</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3  gap-4 mt-4">
          {data?.map((student) => (
            <div
              className="flex border rounded-md border-[rgba(0, 0, 0, 0.2)]  p-4 "
              key={student._id}
            >
              <img
               src={imgs[Math.floor(Math.random() * imgs.length)]}
                className="w-16 h-16 object-cover rounded-full"
              />
              <div className="flex justify-between items-center w-full ml-4 relative">
                <div className="max-w-3/4 overflow-hidden">
                  <p className="text-[18px] font-semibold text-black">
                    {student.first_name} {student.last_name}
                  </p>
                  <div className="flex text-sm text-gray-700 gap-3">
                    <p>Class rank: {student?.group?.name}</p>
                    <span>|</span>
                    <p>Status: {student.status}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-none text-yellow-400 shadow-none cursor-pointer focus:border-0 hover:opacity-50 absolute -bottom-2 -right-2 bg-transparent hover:bg-transparent "
                  onClick={() => handleOpen(student)}
                >
                  <FaCircleArrowRight className="mx-2  " size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedStudent && (
        <ModalStudent open={open} setOpen={setOpen} student={selectedStudent} />
      )}
    </>
  );
}
