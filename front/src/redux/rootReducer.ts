import { AnyAction, combineReducers, ThunkAction } from "@reduxjs/toolkit";
import { reducer as reduxFormReducer } from "redux-form";
import authModule from "./modules/authModule";
import userListModule from "./modules/userListModule";
import loadingModule from "./modules/loadingModule";
import alertDialogModule from "./modules/alertDialogModule";
import cryptocurrencyMasterModule from "./modules/cryptocurrencyMasterModule";

const rootReducer = combineReducers({
  form: reduxFormReducer,
  loading: loadingModule.reducer,
  alert: alertDialogModule.reducer,
  auth: authModule.reducer,
  userList: userListModule.reducer,
  cryptocurrencyMaster: cryptocurrencyMasterModule.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type DefaultThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  AnyAction
>;

export default rootReducer;
