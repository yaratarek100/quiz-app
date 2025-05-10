import { Home } from "lucide-react"
import { MdGroups2 } from "react-icons/md";
import { IoIosAlarm } from "react-icons/io";
import logo from "../assets/images/logo.png"
import { PiExam } from "react-icons/pi";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { THEMECOLOR } from "@/services/ThemeColors";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Students",
    url: "/dashboard/students",
    icon: Home,
  },
  {
    title: "Groups",
    url: "/dashboard/groups",
    icon: MdGroups2,
  },
  {
    title: "Quizzes",
    url: "/dashboard/quizzes",
    icon: IoIosAlarm,
  },
  {
    title: "Results",
    url: "/dashboard/results",
    icon: PiExam,
  },

]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="my-5"><img src={logo} alt="logo"/></SidebarGroupLabel>
          <SidebarGroupContent className="my-5">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="border-top-1 border-b-1">
                  <SidebarMenuButton asChild className="py-8 my-0">
                    <a href={item.url} className="px-6">
                    <div className="text-[90px]" style={{ backgroundColor: THEMECOLOR.mainLightColor }}>
                      <item.icon size={35}/>
                      </div>
                      <span className="font-bold">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
