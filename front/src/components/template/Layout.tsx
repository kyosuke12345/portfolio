import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fotter from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { purple } from "@mui/material/colors";
import { Box } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
  },
});

const Layout: React.VFC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Box sx={{ m: 4 }}>
          <Outlet />
        </Box>
      </main>
      <Fotter />
    </ThemeProvider>
  );
};

export default Layout;
