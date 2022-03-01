import { Alert, AlertTitle, Link } from "@mui/material";
import UserProfilePanelContainer from "components/panel/userprofile/container";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import path from "utils/path";

const UserDetailScreen: React.VFC = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  if (!isAuth) {
    return (
      <Alert severity="warning">
        <AlertTitle>ログインしてください</AlertTitle>
        <Link href={path.dashboardPath.login.href}>ログイン画面</Link>
        にてログインした場合に、ログインユーザの情報が表示されます。
      </Alert>
    );
  } else {
    return (
      <>
        <UserProfilePanelContainer />
      </>
    );
  }
};

export default UserDetailScreen;
