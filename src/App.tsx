// import "./App.css";
// import { Bounce, ToastContainer } from "react-toastify";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// // import i18n from "./i18n";
// import cookies from "js-cookie";
// import Authlayout from "./modules/Auth/Authlayout/Authlayout";
// import Notfound from "./modules/shared/Notfound/Notfound";
// import Login from "./modules/Auth/Login/Login";
// import Register from "./modules/Auth/Register/Register";
// import ForgetPassword from "./modules/Auth/Forget-Password/Forget-Password";
// import ResetPassword from "./modules/Auth/Reset-Password/Reset-Password";
// import Masterlayout from "./modules/dash-board/Masterlayout/Masterlayout";
// import Home from "./modules/dash-board/Home/Home";
// import Students from "./modules/Students/Students";
// import Groups from "./modules/Group/Groups/Groups";
// import Quizzes from "./modules/quiz/Quizzes/Quizzes";
// import { Provider } from "react-redux";
// import store from "./Redux/Store";
// import ChangePassword from "./modules/Auth/Change-Password-modal/Change-Password-modal";
// import Results from "./modules/Results/Results/Results";
// import CompletedQuizzes from "./modules/Results/Completed-Quizzes/Completed-Quizzes";
// import Questions from "./modules/Bank-of-questions/BankOfQuestions";
// import QuizzesData from "./modules/quiz/QuizzesData/QuizzesData";
// import QuizInterface from "./modules/quiz/Quiz/QuizInterface";
// import Unauthorized from "./modules/shared/Unauthorized/Unauthorized";
// import ProtectedRoute from "./modules/shared/Protected-Route/Protected-Route";
// // import QuizForm from "./modules/quiz/Quiz-Form/Quiz-Form";

// function App() {
//   // local

//   const lng = cookies.get("i18next") || "en";

//   // useEffect(() => {
//   //   document.dir = i18n.dir(i18n.language);
//   // }, [i18n.language]);

//   // routes
//   // const routes = createBrowserRouter([
//   //   // auth layout
//   //   {
//   //     path: "",
//   //     element: <Authlayout />,
//   //     errorElement: <Notfound />,
//   //     children: [
//   //       { path: "login", element: <Login /> },
//   //       { path: "", element: <Login /> },
//   //       { path: "register", element: <Register /> },
//   //       { path: "forget-password", element: <ForgetPassword /> },
//   //       { path: "reset-password", element: <ResetPassword /> },
//   //       { path: "change-password", element: <ChangePassword /> },

//   //     ],
//   //   },
//   //   {
//   //     path: "dashboard",
//   //     element: <Masterlayout />,
//   //     errorElement: <Notfound />,
//   //     children: [
//   //       { index: true, element: <Home /> },
//   //       { path: "students", element: <Students /> },
//   //       { path: "groups", element: <Groups /> },
//   //       { path: "quizzes", element: <Quizzes /> },
//   //        {path:"quizzes-data/:id",element:<QuizzesData/> },
//   //       { path: "questions", element: <Questions /> },
//   //       { path: "quiz-interface/:id", element: <QuizInterface /> },
//   //          { path: "results", element: <CompletedQuizzes /> },
//   //       { path: "view-results/:index", element: <Results /> },
//   //     ],
//   //   },

    
//   // ]);

//   const routes = createBrowserRouter([
//   {
//     path: "",
//     element: <Authlayout />,
//     errorElement: <Notfound />,
//     children: [
//       { path: "login", element: <Login /> },
//       { path: "", element: <Login /> },
//       { path: "register", element: <Register /> },
//       { path: "forget-password", element: <ForgetPassword /> },
//       { path: "reset-password", element: <ResetPassword /> },
//       { path: "change-password", element: <ChangePassword /> },
//     ],
//   },
//   {
//     path: "dashboard",
//     element: <ProtectedRoute allowedRoles={["Instructor", "Student"]} />,
//     children: [
//       {
//         path: "",
//         element: <Masterlayout />,
//         children: [
//           { index: true, element: <Home /> },
//           { path: "students", element: <Students /> },
//           { path: "groups", element: <Groups /> },
//           { path: "quizzes", element: <Quizzes /> },
//           { path: "quizzes-data/:id", element: <QuizzesData /> },
//           { path: "questions", element: <Questions /> },
//           { path: "quiz-interface/:id", element: <QuizInterface /> },
//           { path: "results", element: <CompletedQuizzes /> },
//           { path: "view-results/:index", element: <Results /> },
//         ],
//       },
//     ],
//   },
//   {
//     path: "unauthorized",
//     element: <Unauthorized />,
//   },
// ]);
//   return (
//     <>
//     <Provider store={store}>

//       <RouterProvider router={routes}></RouterProvider>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={lng === "ar"}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//         transition={Bounce}
//         />
//         </Provider>
//     </>
//   );
// }
// export default App;


import "./App.css";
import { Bounce, ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import cookies from "js-cookie";
import Authlayout from "./modules/Auth/Authlayout/Authlayout";
import Notfound from "./modules/shared/Notfound/Notfound";
import Login from "./modules/Auth/Login/Login";
import Register from "./modules/Auth/Register/Register";
import ForgetPassword from "./modules/Auth/Forget-Password/Forget-Password";
import ResetPassword from "./modules/Auth/Reset-Password/Reset-Password";
import ChangePassword from "./modules/Auth/Change-Password-modal/Change-Password-modal";
import Masterlayout from "./modules/dash-board/Masterlayout/Masterlayout";
import Home from "./modules/dash-board/Home/Home";
import Students from "./modules/Students/Students";
import Groups from "./modules/Group/Groups/Groups";
import Quizzes from "./modules/quiz/Quizzes/Quizzes";
import QuizzesData from "./modules/quiz/QuizzesData/QuizzesData";
import QuizInterface from "./modules/quiz/Quiz/QuizInterface";
import Questions from "./modules/Bank-of-questions/BankOfQuestions";
import CompletedQuizzes from "./modules/Results/Completed-Quizzes/Completed-Quizzes";
import Results from "./modules/Results/Results/Results";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import Unauthorized from "./modules/shared/Unauthorized/Unauthorized";
import ProtectedRoute from "./modules/shared/Protected-Route/Protected-Route";

const lng = cookies.get("i18next") || "en";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Authlayout />,
    errorElement: <Notfound />,
    children: [
      { path: "", element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },


  {
    path: "unauthorized",
    element: <Unauthorized />,
  },


  {
    path: "dashboard",
    element: <ProtectedRoute allowedRoles={["Instructor", "Student"]} />,
    errorElement: <Notfound />,
    children: [
      {
        path: "",
        element: <Masterlayout />,
        children: [
          { index: true, element: <Home /> },

          // Instructor Only
          {
            element: <ProtectedRoute allowedRoles={["Instructor"]} />,
            children: [
              { path: "students", element: <Students /> },
              { path: "groups", element: <Groups /> },
              { path: "questions", element: <Questions /> },
            ],
          },

          //  Student Only
          {
            element: <ProtectedRoute allowedRoles={["Student"]} />,
            children: [
              { path: "quiz-interface/:id", element: <QuizInterface /> },
              { path: "view-results/:index", element: <Results /> },
            ],
          },

          //  Shared Between Both
          {
            element: <ProtectedRoute allowedRoles={["Instructor", "Student"]} />,
            children: [
              { index: true, element: <Home /> },
              { path: "quizzes", element: <Quizzes /> },
              { path: "quizzes-data/:id", element: <QuizzesData /> },
              { path: "results", element: <CompletedQuizzes /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={lng === "ar"}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </Provider>
  );
}

export default App;
