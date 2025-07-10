import logo from "../../../assets/images/Logo-white-CvOpj-Kx.png";
import qm from "../../../assets/images/qm.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import type { IAuth } from "../../../Interfaces/AuthLayoutInterface";
import { FaUserPlus, FaUserTie } from "react-icons/fa";
export default function AuthLayout() {
  const { pathname } = useLocation();

  const routePropsMap: Record<string, IAuth> = {
    "/": {
      title: "Continue your learning journey with QuizWiz!",
    },
    "/login": {
      title: "Continue your learning journey with QuizWiz!",
    },
    "/register": {
      title: "Continue your learning journey with QuizWiz!",
    },
    "/forget-password": {
      title: "Forgot Password",
      relativeLinkPath: "/login",
    },
    "/reset-password": {
      title: "Reset Password",
    },
    "/change-password": {
      title: "Change password",
    },
  };

  // Get the current route's props or set default props
  const { title } = routePropsMap[pathname] || {
    title: "",
  };
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-3 grid-cols-1 min-h-screen w-full bg-cover bg-center bg-[radial-gradient(circle_at_center,_#0b132b,_#1c2541,_#3a506b)] p-4 ">
        <div className="form-inputs  md:py-6 md:px-8 px-4 py-3 col-span-1  ">
          <img src={logo} alt="logo" className="pb-12" />
          <p className="mb-5  font-bold text-[270%] w-[105%] text-center text-white">{title}</p>
          {["/", "/login", "/register"].includes(pathname) ? (
            <div className="flex gap-20 my-8 justify-center">
              <Link
                to={"/login"}
                className={`p-3 w-[162px] h-[112px] flex-col flex items-center rounded-md justify-center bg-[#ffffff18] transition-all   ${
                  pathname === "/" || pathname === "/login"
                    ? "  shadow-xl"
                    : "bg-transparent "
                }`}
              >
                <FaUserTie color="white" className="text-6xl" />
                <p className="text-white fw-bold mt-2">Sign in</p>
              </Link>
              <Link
                to={"/register"}
                className={`p-3 w-[162px] h-[112px] flex-col flex items-center rounded-md justify-center bg-[#ffffff10]  ${
                  pathname === "/register" ? "  shadow-xl" : "bg-transparent"
                }`}
              >
                <FaUserPlus color="white" className="text-6xl" />
                <p className="text-white fw-bold mt-2">Sign up</p>
              </Link>
            </div>
          ) : null}
          <Outlet />
          <div></div>
        </div>

        <div className="md:py-6 md:px-8 px-4 py-3 col-span-1  justify-center items-center hidden lg:flex">
          <img src={qm} className="w-full" />
        </div>
      </div>
    </>
  );
}
