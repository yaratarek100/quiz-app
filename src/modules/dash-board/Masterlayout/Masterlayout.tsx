
import { Outlet } from 'react-router-dom'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import Navbar from '../Navbar/Navbar'

export default function Masterlayout() {

  return (
    <>
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />

      </main>

<div className='flex flex-col w-full'>
  <Navbar/>
  <Outlet/>
</div>
  
    </SidebarProvider>
    </>
  )
}
