import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertDialogProps } from "components/dialog/alert";

export type AlertDialogState = Pick<
  AlertDialogProps,
  "open" | "title" | "content"
>;

const initialState: AlertDialogState = {
  open: false,
  title: "",
  content: "",
};

const alertDialogModule = createSlice({
  name: "alertDialogModule",
  initialState: initialState,
  reducers: {
    showAlertDialog(
      state: AlertDialogState,
      action: PayloadAction<Pick<AlertDialogProps, "title" | "content">>
    ) {
      state.open = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      return state;
    },
    hideAlertDialog(state: AlertDialogState) {
      state.open = false;
      state.title = "";
      state.content = "";
      return state;
    },
  },
});

export const { showAlertDialog, hideAlertDialog } = alertDialogModule.actions;

export default alertDialogModule;
