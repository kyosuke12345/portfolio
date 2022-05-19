import { Alert, AlertTitle, Box, Link } from "@mui/material";
import LoginFormContainer from "components/form/login/container";
import { useDispatch } from "react-redux";
import path from "utils/path";

const LoginScreen: React.VFC = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Alert severity="warning">
          <AlertTitle>ログイン画面</AlertTitle>
          <div>
            <Link href={path.dashboardPath.userList.href}>ユーザ一覧画面</Link>
            より、email,passwordを確認できます。
          </div>
        </Alert>
      </Box>

      <LoginFormContainer />
    </>
  );
};

export default LoginScreen;
