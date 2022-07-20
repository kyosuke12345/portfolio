import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDidMount } from "rooks";
import path from "utils/path";
import { ScopedCssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LoginScreen from "pages/login/index";
import UserListScreen from "pages/userlist/index";
import { getUserInfo } from "redux/modules/authModule";
import { RootState } from "redux/rootReducer";
import UserDetailScreen from "pages/userdetail/index";
import DashboardLayout from "pages/BaseLayout";
import TetrisScreen from "pages/tetris/index";
import PortFolioScreen from "pages/portfolio";
import ChatScreen from "pages/chat";
import ChartScreen from "pages/chart";

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
                path={path.dashboardPath.tetris.href}
                element={<TetrisScreen />}
              />
              <Route
                path={path.dashboardPath.chat.href}
                element={<ChatScreen />}
              />
              <Route
                path={path.dashboardPath.chart.href}
                element={<ChartScreen />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ScopedCssBaseline>
    );
  }
};

export default App;
