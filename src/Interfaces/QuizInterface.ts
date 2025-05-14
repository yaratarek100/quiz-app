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
