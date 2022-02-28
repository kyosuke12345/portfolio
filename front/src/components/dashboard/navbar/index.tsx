import { AppBar, Grid, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InputIcon from "@mui/icons-material/Input";

export interface DashboardNavbarProps {
  isAuth: boolean;
  isMobile: boolean;
  onLogout: () => void;
  openNav: () => void;
}

const DashboardNavbar: React.VFC<DashboardNavbarProps> = ({
  isAuth,
  isMobile,
  onLogout,
  openNav,
}) => {
  return (
    <AppBar position="absolute">
      <Toolbar>
        {isMobile && (
          <IconButton onClick={openNav} size="large">
            <MenuIcon />
          </IconButton>
        )}
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
