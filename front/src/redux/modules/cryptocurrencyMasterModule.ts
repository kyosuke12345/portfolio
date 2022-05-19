import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showLoading, hideLoading } from "./loadingModule";
import alertDialogModule from "./alertDialogModule";
import { get } from "api/fetch";
import { CryptocurrencyMasterListResponse } from "api/response/cryptocurrencyMasterList.response";
import URL from "api/url";

export type CryptocurrencyMasterState = {
  response?: CryptocurrencyMasterListResponse;
};

const initialState: CryptocurrencyMasterState = {};

const search = createAsyncThunk<CryptocurrencyMasterListResponse>(
  "cryptocurrencMaster/search",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const response = await get<CryptocurrencyMasterListResponse>(
        URL.GET_CRYPTOCURRENCY_MASTER_LIST()
      );
      return response;
    } catch (e) {
      thunkAPI.dispatch(
        alertDialogModule.actions.showAlertDialog({
          title: "サーバーエラー",
          content: "マスターの取得に失敗しました。",
        })
      );
      throw e;
    } finally {
      thunkAPI.dispatch(hideLoading());
    }
  }
);

const cryptocurrencyMasterModule = createSlice({
  name: "cryptocurrencyMasterModule",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(search.fulfilled, (state, action) => {
      state.response = action.payload;
    });
  },
  reducers: {},
});

export default cryptocurrencyMasterModule;
