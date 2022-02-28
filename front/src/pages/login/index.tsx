import { Alert, Box } from "@mui/material";
import LoginFormContainer from "components/form/login/container";
import { LoginFormFileds } from "components/form/login";
import { useDispatch, useSelector } from "react-redux";
import { login } from "redux/modules/authModule";
import { RootState } from "redux/rootReducer";

const LoginScreen: React.VFC = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      {isAuth && (
        <Box mb={2}>
          <Alert severity="warning">すでにログインされています。</Alert>
        </Box>
      )}
      <LoginFormContainer
        onSubmit={(values: LoginFormFileds) => {
          dispatch(login(values));
        }}
      />
    </>
  );
};

export default LoginScreen;
