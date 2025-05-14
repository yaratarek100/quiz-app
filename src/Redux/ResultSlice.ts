import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { QuizI } from "@/Interfaces/QuizInterface";

interface CompletedQuizzesState {
  quizzes: QuizI[] | null;
}

const initialState: CompletedQuizzesState = {
  quizzes: null,
};

const completedQuizzesSlice = createSlice({
  name: "completedQuizzes",
  initialState,
  reducers: {
    setCompletedQuizzes: (state, action: PayloadAction<QuizI[]>) => {
      state.quizzes = action.payload;
    },
  },
});

export const { setCompletedQuizzes } = completedQuizzesSlice.actions;
export default completedQuizzesSlice.reducer;
