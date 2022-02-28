import { Alert, Box } from "@mui/material";
import LoginForm, { LoginFormFileds } from "components/login/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { login } from "redux/modules/authModule";
import { RootState } from "redux/rootReducer";

const LoginFormScreen: React.VFC = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      {isAuth && (
        <Box mb={2}>
          <Alert severity="warning">すでにログインされています。</Alert>
        </Box>
      )}
      <LoginForm
        onSubmit={(values: LoginFormFileds) => {
          dispatch(login(values));
        }}
      />
    </>
  );
};

export default LoginFormScreen;
