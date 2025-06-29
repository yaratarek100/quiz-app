export interface IQuestionData {
  _id: string;
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    _id?: string; 

  };
  answer: string;
  status: boolean;
  instructor: string;
  difficulty: string;
  points: number;
  type: string;
}