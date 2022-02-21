import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "components/dashboard/DashboardLayout";
import path from "utils/path";
import { ScopedCssBaseline } from "@mui/material";
import authModule from "redux/modules/authModule";
import { useDidMount } from "hooks/useDidMount";
import { useDispatch } from "react-redux";
import LoginFormScreen from "pages/LoginFormScreen";

// NOTE: userRoutesがまだ使用できないので、Routeで記載する

const App: React.VFC = () => {
  const dispatch = useDispatch();

  useDidMount(() => {
    dispatch(authModule.actions.login());
  });

  return (
    <ScopedCssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route
              path={path.dashboardPath.login.href}
              element={<LoginFormScreen />}
            />
            <Route
              path={path.dashboardPath.userList.href}
              element={
                <>
                  <div>list</div>
                </>
              }
            />
            <Route
              path={path.dashboardPath.user.href}
              element={
                <>
                  <div>user</div>
                </>
              }
            />
            <Route path="*" element={<div>404</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ScopedCssBaseline>
  );
};

export default App;
