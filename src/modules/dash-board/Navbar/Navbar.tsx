
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { IoIosAlarm } from "react-icons/io";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <>
      <div className="w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={70}> {/* 70% of the width */}
            <div className="flex h-[70px] items-center justify-center p-6">
              <div className="flex flex-1 justify-between">
                <Link to="/dashboard">
                  <h3 className="text-lg font-bold mt-2">Dashboard</h3>
                </Link>
                  
                <div className="flex flex-1 justify-end items-center px-4">
                  <Link to="/">
                    <div className="border border-gray-500 p-2 rounded-full px-4 flex items-center space-x-2">
                      <IoIosAlarm className="text-2xl" /> {/* Increased icon size */}
                      <h3 className="text-lg font-semibold">New Quiz</h3>
                    </div>
                  </Link>
                </div>
                
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle className="h-20" />
          
          <ResizablePanel defaultSize={30}> {/* 30% of the width */}
            <div className="flex h-[70px] items-center justify-center p-6">
              <span className="font-semibold">fff</span>
            </div>
          </ResizablePanel>
      </ResizablePanelGroup>
      <hr className="border-t border-gray-300" />
    </div>
   
  </>  

  )
}
