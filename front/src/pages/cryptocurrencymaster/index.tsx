import { Alert, AlertTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { isAdmin } from "utils/app.util";
import CryptocurrencyMasterTableContainer from "components/table/cryptocurrencymaster/container";
import { useDidMount } from "hooks/useDidMount";
import { search } from "redux/modules/cryptocurrencyMasterModule";

const CryptoCurrencyMaster: React.VFC = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  // 初期処理
  useDidMount(() => {
    dispatch(search());
  });

  if (isAuth && isAdmin(user?.role)) {
    return (
      <>
        <Alert severity="info">
          <AlertTitle>仮想通貨のマスタ</AlertTitle>
        </Alert>
        <CryptocurrencyMasterTableContainer />
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
