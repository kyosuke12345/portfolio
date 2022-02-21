import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import useMobile from "hooks/useMobile";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import ConnectDashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

export const SIDE_MENU_WIDTH = 256;

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
  const isMobile = useMobile();
  return (
    <ThemeProvider theme={theme}>
      <DashboardLayoutRoot>
        <ConnectDashboardNavbar
          isMobile={isMobile}
          openNav={() => setNavOpen(!navOpen)}
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
    </ThemeProvider>
  );
};

export default DashboardLayout;
