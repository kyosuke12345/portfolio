import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultThunkAction } from "redux/rootReducer";
import { showLoading, hideLoading } from "redux/modules/loadingModule";
import { showAlertDialog } from "redux/modules/alertDialogModule";
import { get, post } from "api/fetch";
import URL from "api/url";
import { LoginFormFileds } from "components/form/login";
import { UserDetailResponse } from "api/response/userDetail.response";
import { ERROR_CODE_FORBIDDEN, isErrorResponse } from "api/error";
import path from "utils/path";

export type AuthState = {
  user?: UserDetailResponse;
  isCheckAuthentication: boolean;
  isAuth: boolean;
};

const initialState: AuthState = {
  isCheckAuthentication: false,
  isAuth: false,
};

const authModule = createSlice({
  name: "authModule",
  initialState: initialState,
  reducers: {
    succeedLogin(state: AuthState, action: PayloadAction<UserDetailResponse>) {
      state.user = action.payload;
      state.isAuth = true;
      return state;
    },
    logout(state: AuthState) {
      state.user = undefined;
      state.isAuth = false;
      return state;
    },
    checkAuthentication(state: AuthState) {
      state.isCheckAuthentication = true;
      return state;
    },
  },
});

/** ログイン処理 */
export function login(params: LoginFormFileds): DefaultThunkAction {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      // 認証
      await post(URL.POST_LOGIN(), params);
      const response = await get<UserDetailResponse>(URL.GET_USER_DETAIL());
      location.href = path.dashboardPath.user.href;
      dispatch(authModule.actions.succeedLogin(response));
    } catch (err) {
      dispatch(
        showAlertDialog({
          title: "認証エラー",
          content: "メールアドレスもしくはパスワードが異なります。",
        })
      );
    } finally {
      dispatch(hideLoading());
    }
  };
}

/** ログアウト処理 */
export function logout(): DefaultThunkAction {
  return async (dispatch) => {
    // logout
    await post(URL.POST_LOGOUT(), {});
    dispatch(authModule.actions.logout());
  };
}

export function getUserInfo(): DefaultThunkAction {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await get<UserDetailResponse>(URL.GET_USER_DETAIL());
      dispatch(authModule.actions.succeedLogin(response));
    } catch (err) {
      if (!isErrorResponse(err) || err.status !== ERROR_CODE_FORBIDDEN) {
        dispatch(
          showAlertDialog({
            title: "エラー",
            content: "サーバーでエラーが発生しました。",
          })
        );
      }
    } finally {
      dispatch(hideLoading());
      dispatch(authModule.actions.checkAuthentication());
    }
  };
}

export default {
  ...authModule,
  actions: {
    ...authModule.actions,
    login,
    logout,
  },
};
