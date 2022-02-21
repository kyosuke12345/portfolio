import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import authModule from "redux/modules/authModule";
import { RootState } from "redux/rootReducer";
import { AppDispatch } from "redux/store";
import MenuIcon from "@mui/icons-material/Menu";
import InputIcon from "@mui/icons-material/Input";

export interface DashboardNavbarProps {
  name: string;
  isMobile: boolean;
  onLogout: () => void;
  openNav: () => void;
}

const DashboardNavbar: React.VFC<DashboardNavbarProps> = ({
  name,
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
        <Grid container justifyContent="right">
          <Box pt={1}>
            <Typography variant="h6" component="h1">
              {name}
            </Typography>
          </Box>
          <IconButton onClick={onLogout} color="inherit" size="large">
            <InputIcon />
          </IconButton>{" "}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (
  state: RootState
): Pick<DashboardNavbarProps, "name"> => {
  return {
    name: state.auth.name ?? "",
  };
};

const mapDispatchToProps = (
  dispatch: AppDispatch
): Pick<DashboardNavbarProps, "onLogout"> => {
  const actions = bindActionCreators(
    {
      logout: authModule.actions.logout,
    },
    dispatch
  );

  return {
    onLogout: actions.logout,
  };
};

const ConnectDashboardNavbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardNavbar);

export default ConnectDashboardNavbar;
