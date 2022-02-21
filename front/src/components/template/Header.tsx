import {
  AppBar,
  Box,
  Drawer,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import useMobile from "hooks/useMobile";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const paths = [
  { title: "test1", url: "test1" },
  { title: "test2", url: "test2" },
];

interface HeaderListProps {
  url: string;
  children: React.ReactNode;
  setNavOpen: () => void;
}

const HeaderLinkList: React.FC<HeaderListProps> = ({
  url,
  setNavOpen,
  children,
}) => {
  const theme = useTheme();
  return (
    <Link
      to={url}
      style={{
        textDecoration: "none",
        color: theme.palette.text.primary,
      }}
      onClick={setNavOpen}
    >
      {children}
    </Link>
  );
};

const Header: React.VFC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const isMobile = useMobile();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ ml: 2, flexGrow: 1 }}>
            Headerタイトル
          </Typography>
          {isMobile && (
            <>
              <IconButton onClick={() => setNavOpen(!navOpen)} size="large">
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Toolbar>

        {isMobile ? (
          <Drawer
            anchor="left"
            onClose={() => setNavOpen(false)}
            open={navOpen}
            variant="temporary"
            PaperProps={{
              sx: {
                width: 256,
              },
            }}
          >
            {paths.map((path, index) => (
              <HeaderLinkList
                key={index}
                url={path.url}
                setNavOpen={() => setNavOpen(false)}
              >
                <ListItem>
                  <ListItemButton>
                    <ListItemText primary={path.title} />
                  </ListItemButton>
                </ListItem>
              </HeaderLinkList>
            ))}
          </Drawer>
        ) : (
          <Toolbar>
            <Grid container justifyContent="center">
              {paths.map((path, index) => (
                <HeaderLinkList
                  key={index}
                  url={path.url}
                  setNavOpen={() => setNavOpen(false)}
                >
                  {path.title}
                </HeaderLinkList>
              ))}
            </Grid>
          </Toolbar>
        )}
      </AppBar>
      <Toolbar />
      {!isMobile && <Toolbar />}
    </>
  );
};

export default Header;
