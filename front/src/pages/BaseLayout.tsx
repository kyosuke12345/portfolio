import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import AlertDialogContainer from "components/dialog/alert/container";
import IndicatorContainer from "components/dialog/indicator/container";
import useMobile from "hooks/useMobile";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "redux/rootReducer";
import DashboardNavbar from "../components/dashboard/navbar";
import DashboardSidebar from "../components/dashboard/sidebar";
import { logout } from "redux/modules/authModule";

export const SIDE_MENU_WIDTH = 280;

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

const DashboardLayoutWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    // NOTE:
    paddingLeft: SIDE_MENU_WIDTH,
  },
}));

const DashboardLayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const DashboardLayoutContent = styled("div")(({ theme }) => ({
  flex: "1 1 auto",
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  height: "100%",
  overflow: "auto",
}));

/** baseのtheme */
const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: green[500],
  //   },
  //   secondary: {
  //     main: green[500],
  //   },
  //   background: {
  //     default: "#ffffff",
  //   },
  // },
  // components: {
  //   MuiDrawer: {
  //     styleOverrides: {
  //       paper: {
  //         backgroundColor: "rgba(0, 0, 0, 0.87)",
  //         color: "white",
  //       },
  //     },
  //   },
  // },
});

const DashboardLayout: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const isMobile = useMobile();
  return (
    <ThemeProvider theme={theme}>
      <DashboardLayoutRoot>
        <DashboardNavbar
          isAuth={isAuth}
          isMobile={isMobile}
          openNav={() => setNavOpen(!navOpen)}
          onLogout={() => dispatch(logout())}
        />
        <DashboardSidebar
          isMobile={isMobile}
          openNav={navOpen}
          onCloseNav={() => setNavOpen(false)}
          onClickNav={() => setNavOpen(false)}
        />
        <DashboardLayoutWrapper>
          <DashboardLayoutContainer>
            <DashboardLayoutContent>
              <Outlet />
            </DashboardLayoutContent>
          </DashboardLayoutContainer>
        </DashboardLayoutWrapper>
      </DashboardLayoutRoot>
      <AlertDialogContainer />
      <IndicatorContainer />
    </ThemeProvider>
  );
};

export default DashboardLayout;
