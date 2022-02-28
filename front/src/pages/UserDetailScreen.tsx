import { Alert, AlertTitle } from "@mui/material";
import ProfileComponent from "components/user/ProfileComponent";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";

const UserDetailScreen: React.VFC = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  if (!isAuth) {
    return (
      <Alert severity="warning">
        <AlertTitle>ログインしてください</AlertTitle>
        ログイン画面にてログインした場合に、ログインユーザの情報が表示されます。
        ログインのidとパスワードはこちらから確認ください。
      </Alert>
    );
  } else {
    return (
      <>
        <ProfileComponent />
      </>
    );
  }
};

export default UserDetailScreen;
