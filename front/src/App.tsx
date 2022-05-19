import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import path from "utils/path";
import { ScopedCssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LoginScreen from "pages/login/index";
import UserListScreen from "pages/userlist/index";
import { useDidMount } from "hooks/useDidMount";
import { getUserInfo } from "redux/modules/authModule";
import { RootState } from "redux/rootReducer";
import UserDetailScreen from "pages/userdetail/index";
import DashboardLayout from "pages/BaseLayout";
import PortFolioScreen from "pages/portfolio";
import CryptoCurrencyMaster from "pages/cryptocurrencymaster";
import CryptoCurrencyTimeline from "pages/cryptocurrencytimeline";

// NOTE: userRoutesがまだ使用できないので、Routeで記載する

const App: React.VFC = () => {
  const { isCheckAuthentication } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  useDidMount(() => {
    dispatch(getUserInfo());
  });

  if (!isCheckAuthentication) {
    return <></>;
  } else {
    return (
      <ScopedCssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route
                path={path.dashboardPath.about.href}
                element={<PortFolioScreen />}
              />
              <Route
                path={path.dashboardPath.login.href}
                element={<LoginScreen />}
              />
              <Route
                path={path.dashboardPath.userList.href}
                element={<UserListScreen />}
              />
              <Route
                path={path.dashboardPath.user.href}
                element={<UserDetailScreen />}
              />
              <Route
                path={path.adminDashboardPath.cryptoCurrency.href}
                element={<CryptoCurrencyMaster />}
              />
              <Route
                path={path.adminDashboardPath.cryptoTimeline.href}
                element={<CryptoCurrencyTimeline />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ScopedCssBaseline>
    );
  }
};

export default App;
