
import "./App.css";
import { Bounce, ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import CompletedQuizzes2 from "./modules/Results/Completed-Quizzes/Completed-Quizzes";
import Results from "./modules/Results/Results/Results";
import { Provider } from "react-redux";
import store from "./Redux/Store1";
import Unauthorized from "./modules/shared/Unauthorized/Unauthorized";
import ProtectedRoute from "./modules/shared/Protected-Route/Protected-Route";
import QuizResult from "./modules/quiz/QuizResult/QuizResult";


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
              { path: "view-results/:index", element: <Results /> },
              { path: "quizzes-data/:id", element: <QuizzesData /> },
            ],
          },

          //  Student Only
          {
            element: <ProtectedRoute allowedRoles={["Student"]} />,
            children: [
              { path: "quiz-interface/:id", element: <QuizInterface /> },
              { path: "quiz-result", element: <QuizResult /> }
            ],
          },

          //  Shared Between Both
          {
            element: <ProtectedRoute allowedRoles={["Instructor", "Student"]} />,
            children: [
              { index: true, element: <Home /> },
              { path: "quizzes", element: <Quizzes /> },
              { path: "results", element: <CompletedQuizzes2 /> },
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
