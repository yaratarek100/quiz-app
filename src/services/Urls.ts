
// AuthUrls
export const AUTH_URLS = {
  login: "/auth/login",
  register: "/auth/register",
  verify: ``,
  forgetPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  changePassword: "/auth/change-password",
};

// quizUrls
export const QUIZ_URLS = {
  getTopUpcommingQuizzes: "/quiz/incomming",
  addQuiz: "/quiz",
  getQuiz: (id: string) => `/quiz/${id}`,
  updateQuiz: (id: string) => `/quiz/${id}`,
  getAllQuizzesResults: "/quiz/result",
  getAllCompletedQuizzes: "/quiz/completed",
  joinQuiz: "/quiz/join",
  getQuizWithoutAnswers: (id: string) => `/quiz/without-answers/${id}`,
  submitQuizAnswers: (id: string) => `/quiz/submit/${id}`,
};

// questionsUrls
export const QUESTIONS_URLS = {
  getAllQuestions: "/question",
  getQuestion: (id: string) => `/question/${id}`,
  addQuestion: "/question",
  editQuestion: (id: string) => `/question/${id}`,
  deleteQuestion: (id: string) => `/question/${id}`,
};

//studentsUrls
export const STUDENTS_URLS = {
  getTopStudents: "/student/top-five",
  allStudentsWithoutGroups: "/student/without-group",
  allStudents: "/student",
  StudentDetails: "/",
};

//groupsURLS
export const GROUPS_URLS = {
  getAllGroups: "/group",
  getGroup: (id: string) => `/group/${id}`,
  deleteGroup: (id: string) => `/group/${id}`,
  addGroup: "/group",
  editGroup: (id: string) => `/group/${id}`,
};


export const IMAGE_URL = "https://upskilling-egypt.com:3005";
