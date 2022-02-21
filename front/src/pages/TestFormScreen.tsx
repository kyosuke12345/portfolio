import SampleForm, { SampleFormFileds } from "components/sample/SampleForm";
import { useDidMount } from "hooks/useDidMount";
import { useDispatch, useSelector } from "react-redux";
import { testInit } from "redux/modules/testModule";
import { RootState } from "redux/rootReducer";

const TestFormScreen: React.VFC = () => {
  const { sampleForm } = useSelector((state: RootState) => state.test);
  const dispatch = useDispatch();
  useDidMount(() => {
    dispatch(testInit());
  });
  return (
    <SampleForm
      initialValues={sampleForm}
      onSubmit={(values: SampleFormFileds) =>
        window.alert(JSON.stringify(values))
      }
    />
  );
};

export default TestFormScreen;
