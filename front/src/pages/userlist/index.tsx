import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import UserListTableContainer from "components/table/user/container";
import { useDispatch } from "react-redux";
import { useDidMount } from "rooks";
import { search, USER_LIST_PAGE_PER } from "redux/modules/userListModule";

const UserListScreen: React.VFC = () => {
  const dispatch = useDispatch();
  useDidMount(() => {
    dispatch(search(1, USER_LIST_PAGE_PER));
  });
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Alert severity="warning">
          <AlertTitle>ユーザ一覧画面</AlertTitle>
          <div>password:暗号化されたパスワード</div>
          <div>plainPassword:暗号化前のパスワード</div>
          ※どなたでも動作を確認できるように、暗号化前のパスワードもDBに保存しております。
        </Alert>
      </Box>

      <Typography variant={"h3"} gutterBottom>
        {"User一覧"}
      </Typography>
      <UserListTableContainer />
    </>
  );
};

export default UserListScreen;
