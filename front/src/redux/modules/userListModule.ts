import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultThunkAction } from "redux/rootReducer";
import { showLoading, hideLoading } from "redux/modules/loadingModule";
import { showAlertDialog } from "redux/modules/alertDialogModule";
import { get } from "api/fetch";
import { UserListResponse } from "api/response/userList.response";
import URL from "api/url";

export const USER_LIST_PAGE_PER = 10;

export type UserListState = {
  listResponse?: UserListResponse;
};

const initialState: UserListState = {};

const userListModule = createSlice({
  name: "userListModule",
  initialState: initialState,
  reducers: {
    setUserList(state: UserListState, action: PayloadAction<UserListResponse>) {
      state.listResponse = action.payload;
      return state;
    },
  },
});

export function search(page: number, per: number): DefaultThunkAction {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await get<UserListResponse>(
        URL.GET_USER_LIST(page, per)
      );
      dispatch(userListModule.actions.setUserList(response));
    } catch (err) {
      console.log(`userListModule search err :`, err);
      dispatch(
        showAlertDialog({
          title: "サーバエラー",
          content: "ユーザデータの取得に失敗しました。",
        })
      );
    } finally {
      dispatch(hideLoading());
    }
  };
}

export default userListModule;
