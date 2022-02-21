import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultThunkAction } from "redux/rootReducer";

export type Pagination = {
  per: number;
  page: number;
  total: number;
  totalPages: number;
};

export type UserListState = {
  pager: Pagination;
};

const initialState: UserListState = {
  pager: {
    per: 10,
    page: 1,
    total: 0,
    totalPages: 0,
  },
};

const userListModule = createSlice({
  name: "userListModule",
  initialState: initialState,
  reducers: {},
});

export default userListModule;
