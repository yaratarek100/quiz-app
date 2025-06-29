import { Home } from "lucide-react";
import { MdGroups2 } from "react-icons/md";
import { IoIosAlarm } from "react-icons/io";
import logo from "../assets/images/logo.png";
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
} from "@/components/ui/sidebar";
import { THEMECOLOR } from "@/services/ThemeColors";
import { useSelector } from "react-redux";
import type { RootState } from "@/Redux/Store1";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    forStudent: true,
  },
  {
    title: "Students",
    url: "/dashboard/students",
    icon: Home,
    forStudent: false,
  },
  {
    title: "Groups",
    url: "/dashboard/groups",
    icon: MdGroups2,
    forStudent: false,
  },
  {
    title: "Quizzes",
    url: "/dashboard/quizzes",
    icon: IoIosAlarm,
    forStudent: true,
  },
  {
    title: "Results",
    url: "/dashboard/results",
    icon: PiExam,
    forStudent: true,
  },
];

export function AppSidebar() {
  const userData = useSelector(
    (state: RootState) => state.AuthReduceer.loginData
  );
  console.log(userData?.role);
  const isStudent = userData?.role === "Student";

  // Filter items: show all for instructors, only forStudent-true for students
  const visibleItems = isStudent
    ? items.filter((item) => item.forStudent)
    : items;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="my-5">
            <img src={logo} alt="logo" />
          </SidebarGroupLabel>
          <SidebarGroupContent className="my-5">
            <SidebarMenu>
              {visibleItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="border-top-1 border-b-1"
                >
                  <SidebarMenuButton asChild className="py-8 my-0">
                    <a href={item.url} className="px-6">
                      <div
                        className="text-[90px]"
                        style={{ backgroundColor: THEMECOLOR.mainLightColor }}
                      >
                        <item.icon size={35} />
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
  );
}
