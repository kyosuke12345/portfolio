import { AppBar, Box, Typography } from "@mui/material";

const MainHeader: React.VFC = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        alignItems: "center",
        width: "100%",
        zIndex: 100,
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Typography
          variant="h4"
          component="div"
          padding={2}
          sx={{ flexGrow: 1 }}
        >
          K'S Portfolio
        </Typography>
      </AppBar>
    </Box>
  );
};

export default MainHeader;
