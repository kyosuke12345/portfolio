import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InputIcon from "@mui/icons-material/Input";
import { SIDE_MENU_WIDTH } from "pages/BaseLayout";

export interface DashboardNavbarProps {
  isAuth: boolean;
  isMobile: boolean;
  title: string;
  onLogout: () => void;
  openNav: () => void;
}

const DashboardNavbar: React.VFC<DashboardNavbarProps> = ({
  isAuth,
  isMobile,
  title,
  onLogout,
  openNav,
}) => {
  return (
    <AppBar position="absolute">
      <Toolbar>
        {isMobile && (
          <IconButton onClick={openNav} size="large">
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
        )}
        <Box sx={{ width: "100%" }}>
          {isMobile ? (
            <Typography>{title}</Typography>
          ) : (
            <Typography style={{ paddingLeft: SIDE_MENU_WIDTH }}>
              {title}
            </Typography>
          )}
        </Box>
        {isAuth && (
          <Grid container justifyContent="right">
            <IconButton onClick={onLogout} color="inherit" size="large">
              <InputIcon />
            </IconButton>{" "}
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
