import { AnyAction, combineReducers, ThunkAction } from "@reduxjs/toolkit";
import { reducer as reduxFormReducer } from "redux-form";
import authModule from "./modules/authModule";
import testModule from "./modules/testModule";
import userListModule from "./modules/userListModule";

const rootReducer = combineReducers({
  form: reduxFormReducer,
  test: testModule.reducer,
  auth: authModule.reducer,
  userList: userListModule.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type DefaultThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  AnyAction
>;

export default rootReducer;
