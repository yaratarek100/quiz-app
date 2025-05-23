import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdKeyboardArrowDown } from "react-icons/md";

import { FaEnvelope } from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";
import type { RootState } from "@/redux/Store";

import { useDispatch } from "react-redux";
import { logOut } from "@/Redux/AuthSlice";
import { toast } from "react-toastify";
import joinQuizImg from "../../../assets/images/new quiz text.png"
import newQuizImg from "../../../assets/images/new quiz text.png"

export default function Navbar() {

  const userData = useSelector((state:RootState) => state.AuthReduceer.loginData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut()); // 
    localStorage.removeItem("user"); 
    toast.success("Logged out successfully")
    navigate("/login")
  };
  

  return (
    <>
      <div className="w-full">
      {userData?.role == "Instructor" ? 
        (<ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={70}> {/* 70% of the width */}
            <div className="flex h-[70px] items-center justify-center p-6">
              <div className="flex flex-1 justify-between">
                <Link to="/dashboard">
                  <h3 className="text-lg font-bold mt-2">Dashboard</h3>
                </Link>
                  
                <div className="flex flex-1 justify-end items-center px-4">
                  <Link to="/">
                    <div className="border border-gray-500 p-2 rounded-full px-4 flex items-center space-x-2">
                      <img src={newQuizImg}/>
                    </div>
                  </Link>
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
                    <span>{userData?.first_name} {userData?.last_name}</span>
                    <MdKeyboardArrowDown className="text-lg" /> {/* Ensures inline placement */}
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel style={{ color:"rgba(197, 216, 109, 1)" }}>{userData?.role}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>



              </span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>) :
         (<ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={60}>
            <div className="flex h-[70px] items-center justify-center p-6">
              <div className="flex flex-1 justify-between">
                <Link to="/dashboard">
                  <h3 className="text-lg font-bold mt-2">Dashboard</h3>
                </Link>
                <div className="flex flex-1 justify-end items-center px-4">
                  <Link to="/">
                    <div className="border border-gray-500 p-2 rounded-full px-4 flex items-center space-x-2">
               
                      <img src={joinQuizImg}/>
               
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="h-20" />

          <ResizablePanel defaultSize={10} className="flex items-center justify-center mt-3">
            <div className="relative">
              <FaEnvelope className="text-3xl" />
              <span className="absolute top-0 right-0 bg-[#f9dcc6] text-xs rounded-full px-1">
                5 
              </span>
            </div>
          </ResizablePanel>

          <ResizableHandle className="h-20" />

          <ResizablePanel defaultSize={10} className="flex items-center justify-center mt-4"> 
            <div className="relative">
              <HiBellAlert className="text-3xl" />
              <span className="absolute top-0 right-0 bg-[#f9dcc6] text-xs rounded-full px-1">
                2 
              </span>
            </div>
          </ResizablePanel>

  <ResizableHandle className="h-20" />

  <ResizablePanel defaultSize={30}> {/* 30% of the width */}
    <div className="flex h-[70px] items-center justify-center p-6">
      <span className="font-semibold">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center space-x-2">
          <span>{userData?.first_name} {userData?.last_name}</span>
          <MdKeyboardArrowDown className="text-lg" />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel style={{ color:"rgba(197, 216, 109, 1)" }}>{userData?.role}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
      </span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>
) }
        <hr className="border-t border-gray-300" />
    </div>
   
  </>  

  )
}
