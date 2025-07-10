import { configureStore } from "@reduxjs/toolkit";
import { AuthReduceer } from "./AuthSlice";
import { apis } from "./apis.ts";
import { setupListeners } from "@reduxjs/toolkit/query";
import completedQuizzesReducer from "./ResultSlice.ts";
import modalReducer from "./ModalSlice.ts";
import JoinQuizModalSlice from "./JoinQuizSlice.ts";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    JoinQuizModalSlice: JoinQuizModalSlice,
    AuthReduceer,
    [apis.reducerPath]: apis.reducer,
    completedQuizzes: completedQuizzesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;