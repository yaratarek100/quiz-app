export interface CreatedSuccessfullyProps {
  openSuccessDialog: boolean;
  setOpenSuccessDialog: (open: boolean) => void;
  itemType: string;
  code: string;
}
export interface QuizFormProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  itemType?: string;
  handleDelete?: () => void;
}

export interface QuizFormValues {
  title: string;
  duration: string;
  questions_number: number;
  score_per_question: string;
  description: string;
  difficulty: string;
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