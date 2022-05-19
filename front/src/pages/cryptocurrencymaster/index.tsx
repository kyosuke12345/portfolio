import { Alert, AlertTitle } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { isAdmin } from "utils/app.util";

const CryptoCurrencyMaster: React.VFC = () => {
  const { isAuth, user } = useSelector((state: RootState) => state.auth);

  if (isAuth && isAdmin(user?.role)) {
    return (
      <>
        <Alert severity="info">
          <AlertTitle>仮想通貨のマスタ</AlertTitle>
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

export default CryptoCurrencyMaster;
