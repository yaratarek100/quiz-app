import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

const JoinQuizModalSlice = createSlice({
  name: "JoinQuizModalSlice",
  initialState,
  reducers: {
    openJoinQuizModal: (state) => {
      state.isOpen = true;
    },
    closeJoinQuizModal: (state) => {
      state.isOpen = false;
    },
    toggleJoinQuizModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openJoinQuizModal, closeJoinQuizModal, toggleJoinQuizModal } = JoinQuizModalSlice.actions;

export default JoinQuizModalSlice.reducer;