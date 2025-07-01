import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdKeyboardArrowDown } from "react-icons/md";

import type { RootState } from "@/Redux/Store1";

import { useDispatch } from "react-redux";
import { logOut } from "@/Redux/AuthSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { openModal } from "@/Redux/ModalSlice";

import newQuiz from "../../../assets/images/new quiz icon.svg";

export default function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const getPageTitle = (): string => {
    const path = location.pathname;

    if (path.endsWith("/dashboard")) return "Dashboard";
    if (path.includes("/students")) return "Students";
    if (path.includes("/groups")) return "Groups";
    if (path.includes("/quizzes")) return "Quizzes";
    if (path.includes("/results")) return "Results";
    if (path === "/") return "Home";

    return "Welcome";
  };

  const userData = useSelector(
    (state: RootState) => state.AuthReduceer.loginData
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut()); //
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <div className="w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={70}>
            {" "}
            {/* 70% of the width */}
            <div className="flex h-[70px] items-center justify-center p-6">
              <div className="flex  flex-1 justify-between  ps-10">
                <h3 className="text-lg font-bold mt-2">{getPageTitle()}</h3>

                <div className="flex  flex-1 justify-end items-center px-4">
                  
                    <div className=" hidden sm:flex border border-gray-500 p-2 rounded-full px-4  items-center space-x-2 cursor-pointer hover:bg-gray-100 ">
                      {userData?.role == "Instructor" ? (
                        <div onClick={() => dispatch(openModal())}>
                          <img src={newQuiz} className="inline size-6 me-2" alt="Quiz Icon" />
                          New Quiz
                        </div>
                      ) : (
                        <div onClick={() => dispatch(openModal())}>
                          <img src={newQuiz} className="inline size-6 me-2" alt="Quiz Icon" />
                          Join Quiz
                        </div>
                      )}
                    </div>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="h-20" />

          <ResizablePanel defaultSize={30} className="overflow-visible">
            <div className="flex h-[70px] items-center justify-center p-6">
              <span className="font-semibold">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2">
                    <span className="cursor-pointer">
                      {userData?.first_name} {userData?.last_name}
                    </span>
                    <MdKeyboardArrowDown className="text-lg" />{" "}
                    {/* Ensures inline placement */}
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel
                      style={{ color: "rgba(197, 216, 109, 1)" }}
                    >
                      {userData?.role}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
        <hr className="border-t border-gray-300" />
      </div>
    </>
  );
}
