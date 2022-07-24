import { Box } from "@mui/material";
import MainHeader from "components/main/header";
import HomeAbout from "components/main/home/about";
import HomeMain from "components/main/home/main";

const Home: React.VFC = () => {
  return (
    <>
      <MainHeader />
      <HomeMain />
      <HomeAbout />

      <Box
        paddingTop={8}
        paddingBottom={8}
        sx={{ backgroundColor: "yellow", flexGrow: 1, zIndex: 1 }}
      ></Box>
    </>
  );
};

export default Home;
