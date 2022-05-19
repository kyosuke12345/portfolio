import { Alert, AlertTitle } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { isAdmin } from "utils/app.util";

const CryptoCurrencyTimeline: React.VFC = () => {
  const { isAuth, user } = useSelector((state: RootState) => state.auth);

  if (isAuth && isAdmin(user?.role)) {
    return (
      <>
        <Alert severity="info">
          <AlertTitle>仮想通貨のタイムライン</AlertTitle>
        </Alert>
      </>
    );
  } else {
    return (
      <Alert severity="warning">
        <AlertTitle>管理者しかログインできません。</AlertTitle>
      </Alert>
    );
  }
};

export default CryptoCurrencyTimeline;
