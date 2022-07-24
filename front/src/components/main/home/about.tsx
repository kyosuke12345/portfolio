import { Avatar, Box, Typography, styled } from "@mui/material";
import { Reveal } from "react-genie";
import { Animation } from "react-genie-styled-components";
import { ReactGenieAnimations } from "react-genie-styled-components";

const AboutBox = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(4),
  flexDirection: "row",
  alignContent: "center",
  alignItems: "center",
  maxWidth: "70%",
  margin: "auto",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
  [theme.breakpoints.up("lg")]: {
    paddingRight: "10vw",
    paddingLeft: "10vw",
  },
}));

const HomeAbout: React.VFC = () => {
  return (
    <>
      <ReactGenieAnimations />
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#fafafa",
        }}
      >
        <Reveal animation={Animation.FadeInUp} delay={750}>
          <Typography variant="h2" textAlign={"center"}>
            About Me
          </Typography>
          <AboutBox>
            <Avatar
              src="/images/45832015.png"
              sx={{
                width: 256,
                height: 256,
                fontSize: 96,
                mb: 1,
                margin: "auto",
              }}
            ></Avatar>
            <Typography padding={3} variant="body1" textAlign={"center"}>
              兵庫県出身のエンジニア。
              文系の大学を卒業し、営業職に就くもやりがいを感じず、1年で退社。
              その後IT技術に惹かれ、専門学校でプログラミングを学び、24歳でIT業界へ転職。
              アプリ開発からキャリアをスタートし、基幹システムの作成、Webサイトの作成、インフラ構築など、幅広く業務を経験。
              アバターの写真は実家の犬です。
            </Typography>
          </AboutBox>
        </Reveal>
      </Box>
    </>
  );
};

export default HomeAbout;
