import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "components/dashboard/DashboardLayout";
import path from "utils/path";
import { ScopedCssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LoginFormScreen from "pages/LoginFormScreen";
import UserListScreen from "pages/UserListScreen";
import { useDidMount } from "hooks/useDidMount";
import { getUserInfo } from "redux/modules/authModule";
import { RootState } from "redux/rootReducer";
import UserDetailScreen from "pages/UserDetailScreen";

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
              <Route path={path.dashboardPath.about.href} element={<></>} />
              <Route
                path={path.dashboardPath.login.href}
                element={<LoginFormScreen />}
              />
              <Route
                path={path.dashboardPath.userList.href}
                element={<UserListScreen />}
              />
              <Route
                path={path.dashboardPath.user.href}
                element={<UserDetailScreen />}
              />
              <Route path="*" element={<div>404</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ScopedCssBaseline>
    );
  }
};

export default App;
