export interface CreatedSuccessfullyProps {
  openSuccessDialog: boolean;
  setOpenSuccessDialog: (open: boolean) => void;
  itemType: string;
  code: string;
}

export interface IQuiz {
  participants: any[];
  code: string;
  title: string;
  description: string;
  status: boolean;
  instructor: string;
  group: string;
  questions_number: number;
  questions: [string];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
  __v: 0;
}

export interface QuizFormValues {
  title: string;
  duration: string;
  questions_number: number;
  score_per_question: string;
  description: string;
  difficulty: string;
  schadule :Date;
  type: string;
  group: string;
}

export interface Group {
  _id: string;
  name: string;
  status: "active" | "inactive";
  instructor: string;
  students: string[];
  max_students: number;
}
// import
export interface QuizI {
  participants: any[];
  quiz: QuizType;
}

export interface QuizType {
  createdAt: string;
  group: string;
  title: string;
  _id: string;
}
export interface QuestionI {
  status: string;
  description: string;
  difficulty: string;
  title: string;
  _id: string;
}

export interface QuizFormInputs {
  duration: string;
  numberOfQuestions: string;
  scorePerQuestion: string;
  schadule: Date;
  description: string;
}

export interface QuizData {
  title: string;
  duration: number;
  questions: { id: string }[];
  score_per_question: number;
  description: string;
  schadule: string;
}

export  interface Quiz {
  _id: string;
  title: string;
  schadule: string;
  participants: number;
 
}

export interface IAppState {
  AuthReduceer: {
    loginData: {
      role: string;
     
    };
  };
 
}

export interface IFormData {
  code: string;
}

interface IQuizQuestion {
  _id: string;
  title: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    _id: string;
  };
}

export  interface IQuizData {
  _id: string;
  title: string;
  questions: IQuizQuestion[];
}
