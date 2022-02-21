import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultThunkAction } from "redux/rootReducer";

export type AuthState = {
  name?: string;
};

const initialState: AuthState = {};

const authModule = createSlice({
  name: "authModule",
  initialState: initialState,
  reducers: {
    succeedLogin(state: AuthState, action: PayloadAction<string>) {
      state.name = action.payload;
      return state;
    },
  },
});

/** ログイン処理 */
function login(): DefaultThunkAction {
  return (dispatch) => {
    // TODO ログイン処理
    console.log("ログイン");
    dispatch(authModule.actions.succeedLogin("test"));
  };
}

/** ログアウト処理 */
function logout(): DefaultThunkAction {
  return (dispatch) => {
    // TODO ログアウト処理
    dispatch(authModule.actions.succeedLogin(""));
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
