import { Typography } from "@mui/material";
import UserListTableContainer from "components/table/UserListTableContainer";
import { useDidMount } from "hooks/useDidMount";
import { useDispatch } from "react-redux";
import { search, USER_LIST_PAGE_PER } from "redux/modules/userListModule";

const UserListScreen: React.VFC = () => {
  const dispatch = useDispatch();
  useDidMount(() => {
    console.log("userDidMoungt");
    dispatch(search(1, USER_LIST_PAGE_PER));
  });
  return (
    <>
      <Typography>{"User一覧"}</Typography>
      <UserListTableContainer />
    </>
  );
};

export default UserListScreen;
