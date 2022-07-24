import { ThemeProvider, createTheme } from "@mui/material/styles";
import AlertDialogContainer from "components/dialog/alert/container";
import IndicatorContainer from "components/dialog/indicator/container";
import { Outlet } from "react-router-dom";

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

const MainBaseLayout: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
      <AlertDialogContainer />
      <IndicatorContainer />
    </ThemeProvider>
  );
};

export default MainBaseLayout;
