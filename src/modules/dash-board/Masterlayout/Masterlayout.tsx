
import { Outlet } from 'react-router-dom'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import Navbar from '../Navbar/Navbar'
import QuizForm from '@/modules/quiz/Quiz-Form/Quiz-Form'
import { JoinQuiz } from '@/modules/quiz/Join-Quiz/Join-Quiz'
import { useSelector } from 'react-redux'
import type { RootState } from '@/Redux/Store1'

export default function Masterlayout() {

   const userData = useSelector(
      (state: RootState) => state.AuthReduceer.loginData
    );

  return (
    <>
    <SidebarProvider>
      <AppSidebar />
      <div className='relative'>
        <SidebarTrigger />

      </div>

<div className='flex flex-col w-full'>
  <Navbar/>
  {userData?.role == "Instructor" ?(

<QuizForm/>
  )
:
(

  <JoinQuiz/>
)}
  <div className='container px-[3%] py-[3%] mx-auto'>
  <Outlet/>
  </div>
   
</div>
  
    </SidebarProvider>
    </>
  )
}
