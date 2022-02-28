import { createSlice } from "@reduxjs/toolkit";

export type LoadingState = {
  open: boolean;
};

const initialState: LoadingState = {
  open: false,
};

const loadingModule = createSlice({
  name: "loadingModule",
  initialState: initialState,
  reducers: {
    showLoading(state: LoadingState) {
      state.open = true;
      return state;
    },
    hideLoading(state: LoadingState) {
      state.open = false;
      return state;
    },
  },
});

export const { showLoading, hideLoading } = loadingModule.actions;

export default loadingModule;
