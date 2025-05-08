
import authImg from '../../../assets/images/authImage-BgKXNIO-.svg'
import logo from '../../../assets/images/Logo-white-CvOpj-Kx.png'
import { Link, Outlet, useLocation } from "react-router-dom";
import type { IAuth } from "../../../Interfaces/AuthLayoutInterface";
import { FaUserPlus, FaUserTie } from "react-icons/fa";
export default function AuthLayout() {
  const {pathname} = useLocation(); 

  const routePropsMap: Record<string, IAuth> = {
    '/': {
      title: "Continue your learning journey with QuizWiz!",
       },
    '/login': {
    title: "Continue your learning journey with QuizWiz!",

    },
    '/register': {
    title: "Continue your learning journey with QuizWiz!",

    },
    '/forget-password': {
    title: "Forgot Password",
    relativeLinkPath:"/login"
    },
    '/reset-password': {
    title: 'Reset Password',
    },
    '/change-password': {
    title:"Change password",
    },
};

// Get the current route's props or set default props
const {  title } = routePropsMap[pathname] || {
    title: '',
};
  return <>

  <div className="grid md:grid-cols-2 gap-3 grid-cols-1 bg-[#0D1321] ">
<div className="form-inputs  md:py-6 md:px-8 px-4 py-3 ">
<img src={logo} alt="logo" className="pb-12" />
<p className="mb-5 text-[#F8B55F] font-bold text-2xl">{title}</p>
{['/', '/login', '/register'].includes(pathname)?<div className="flex gap-5">
  <Link to={'/login'} className={`p-3 w-[162px] h-[112px] flex-col flex items-center rounded-md justify-center border-4 bg-[#333333] ${pathname==='/'||pathname==='/login'? 'border-[#f8b55f] ':'border-transparent' }` }>
  <FaUserTie color="white" className="text-6xl"/>
<p className="text-white fw-bold mt-2">Sign in</p>
</Link>
  <Link to={'/register'} className={`p-3 w-[162px] h-[112px] flex-col flex items-center rounded-md justify-center border-4 bg-[#333333] ${pathname==='/register'? 'border-[#f8b55f] ':'border-transparent'}`}>
  <FaUserPlus   color="white" className="text-6xl"/>
<p className="text-white fw-bold mt-2">Sign up</p>
</Link>
</div>:null}
<Outlet/>
<div>

</div>
</div>
<div className="image md:block hidden bg-info p-6">
  <img src={authImg} alt="auth-img" className="w-full max-h-screen "  />
</div>
  </div>
  </>;


// return (
//   <div className="grid md:grid-cols-2 grid-cols-1 bg-[#0D1321] h-screen overflow-hidden">
    
//     {/* Left side: Scrollable Form */}
//     <div className="form-inputs overflow-y-auto scrollbar-hide h-full md:py-6 md:px-8 px-4 py-3">
//       <img src={logo} alt="logo" className="pb-12" />
//       <p className="mb-5 text-[#F8B55F] font-bold text-2xl">{title}</p>

//       {['/', '/login', '/register'].includes(pathname) && (
//         <div className="flex gap-5 mb-6">
//           <Link
//             to="/login"
//             className={`p-3 w-[162px] h-[112px] flex-col flex items-center rounded-md justify-center border-4 bg-[#333333] ${
//               pathname === '/' || pathname === '/login'
//                 ? 'border-[#f8b55f]'
//                 : 'border-transparent'
//             }`}
//           >
//             <FaUserTie color="white" className="text-6xl" />
//             <p className="text-white fw-bold mt-2">Sign in</p>
//           </Link>

//           <Link
//             to="/register"
//             className={`p-3 w-[162px] h-[112px] flex-col flex items-center rounded-md justify-center border-4 bg-[#333333] ${
//               pathname === '/register' ? 'border-[#f8b55f]' : 'border-transparent'
//             }`}
//           >
//             <FaUserPlus color="white" className="text-6xl" />
//             <p className="text-white fw-bold mt-2">Sign up</p>
//           </Link>
//         </div>
//       )}

//       <Outlet />
//     </div>

//     {/* Right side: Normal Image */}
//     <div className="hidden md:flex items-center justify-center p-6">
//       <img src={authImg} alt="auth-img" className="max-w-full max-h-full object-contain" />
//     </div>
//   </div>
// );


}
