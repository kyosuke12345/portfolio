import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SampleFormFileds } from "components/sample/SampleForm";
import { DefaultThunkAction } from "redux/rootReducer";

export type TestState = {
  count: number;
  sampleForm?: Partial<SampleFormFileds>;
};

const initialState: TestState = {
  count: 0,
};

const testModule = createSlice({
  name: "testModule",
  initialState: initialState,
  reducers: {
    addCount(state: TestState, action: PayloadAction<number>) {
      state.count += action.payload;
      return state;
    },
    reducerCount(state: TestState, action: PayloadAction<number>) {
      state.count -= action.payload;
      return state;
    },
    setSampleForm(
      state: TestState,
      action: PayloadAction<Partial<SampleFormFileds>>
    ) {
      state.sampleForm = action.payload;
      return state;
    },
  },
});

export function testInit(): DefaultThunkAction {
  return (dispatch) => {
    dispatch(
      testModule.actions.setSampleForm({
        firstName: "姓",
        lastName: "名",
        email: "test@gmail.com1",
        // sex: "male",
        favoriteColor: "red",
        favoriteColor2: ["red", "blue"],
        isCheck: false,
      })
    );
  };
}

export const { addCount, reducerCount } = testModule.actions;

export default testModule;
