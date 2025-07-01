
import { Outlet } from 'react-router-dom'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import Navbar from '../Navbar/Navbar'
import QuizForm from '@/modules/quiz/Quiz-Form/Quiz-Form'

export default function Masterlayout() {

  return (
    <>
    <SidebarProvider>
      <AppSidebar />
      <div className='relative'>
        <SidebarTrigger />

      </div>

<div className='flex flex-col w-full'>
  <Navbar/>
  <QuizForm/>
  <div className='container px-[3%] py-[3%] mx-auto'>
  <Outlet/>
  </div>
   
</div>
  
    </SidebarProvider>
    </>
  )
}
