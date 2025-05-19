import "./App.css";
import { Bounce, ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import i18n from "./i18n";
import cookies from "js-cookie";
import Authlayout from "./modules/Auth/Authlayout/Authlayout";
import Notfound from "./modules/shared/Notfound/Notfound";
import Login from "./modules/Auth/Login/Login";
import Register from "./modules/Auth/Register/Register";
import ForgetPassword from "./modules/Auth/Forget-Password/Forget-Password";
import ResetPassword from "./modules/Auth/Reset-Password/Reset-Password";
import Masterlayout from "./modules/dash-board/Masterlayout/Masterlayout";
import Home from "./modules/dash-board/Home/Home";
import Students from "./modules/Students/Students";
import Groups from "./modules/Group/Groups/Groups";
import Quizzes from "./modules/quiz/Quizzes/Quizzes";
import QuizPage from "./modules/quiz/Quiz-Page/Quiz-Page";
import { Provider } from "react-redux";
import store from "./redux/Store";
import ChangePassword from "./modules/Auth/Change-Password-modal/Change-Password-modal";
import Results from "./modules/Results/Results/Results";
import CompletedQuizzes from "./modules/Results/Completed-Quizzes/Completed-Quizzes";
import Questions from "./modules/Bank-of-questions/BankOfQuestions";
import QuizzesData from "./modules/quiz/QuizzesData/QuizzesData";
// import QuizForm from "./modules/quiz/Quiz-Form/Quiz-Form";

function App() {
  // local

  const lng = cookies.get("i18next") || "en";

  // useEffect(() => {
  //   document.dir = i18n.dir(i18n.language);
  // }, [i18n.language]);

  // routes
  const routes = createBrowserRouter([
    // auth layout
    {
      path: "",
      element: <Authlayout />,
      errorElement: <Notfound />,
      children: [
        { path: "login", element: <Login /> },
        { path: "", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },

      ],
    },
    {
      path: "dashboard",
      element: <Masterlayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Home /> },
        { path: "students", element: <Students /> },
        { path: "groups", element: <Groups /> },
        { path: "quizzes", element: <Quizzes /> },
         {path:"quizzes-data/:id",element:<QuizzesData/> },
        { path: "questions", element: <Questions /> },
        { path: "quiz-page", element: <QuizPage /> },
           { path: "results", element: <CompletedQuizzes /> },
        { path: "view-results/:index", element: <Results /> },
      ],
    },

    
  ]);
  return (
    <>
    <Provider store={store}>

      <RouterProvider router={routes}></RouterProvider>
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
    </>
  );
}
export default App;
