import { Box, styled, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const DownAllowIconWrapper = styled("div")({
  opacity: 0,
  "@keyframes overlay": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  animation: "overlay 1s ease forwards",
  animationDelay: "3s",
});

const DownAllowIcon = styled("span")({
  "@keyframes bounce": {
    "0%, 20%, 50%, 80%, 100%": {
      transform: "translateY(0)",
    },
    "40%": {
      transform: "translateY(-30px)",
    },
    "60%": {
      transform: "translateY(-15px)",
    },
  },
  animation: "bounce 2s infinite ease",
  marginTop: "-40px",
  position: "absolute",
});

const BORDER_ANIMATION = "2s cubic-bezier(0.22, 1, 0.36, 1) forwards";

const BottomBorderAnime = styled("div")({
  position: "absolute",
  width: "100%",
  left: 0,
  bottom: 0,
  opacity: 0,
  border: "solid",
  "@keyframes stroke-width": {
    "0%": {
      width: "0",
    },
    "100%": {
      width: "100%",
      opacity: 1,
    },
  },
  animation: `stroke-width ${BORDER_ANIMATION}`,
});

const LeftBorderAnime = styled("div")({
  position: "absolute",
  height: "100%",
  top: 0,
  left: 0,
  opacity: 0,
  border: "solid",
  "@keyframes stroke-height": {
    "0%": {
      height: "0",
    },
    "100%": {
      height: "100%",
      opacity: 1,
    },
  },
  animation: `stroke-height ${BORDER_ANIMATION}`,
});

const RightBorderAnime = styled("div")({
  position: "absolute",
  height: "100%",
  bottom: 0,
  right: 0,
  border: "solid",
  opacity: 0,
  "@keyframes stroke-height": {
    "0%": {
      height: "0",
    },
    "100%": {
      height: "100%",
      opacity: 1,
    },
  },
  animation: `stroke-height ${BORDER_ANIMATION}`,
});

const MainTitle = styled("div")({
  textAlign: "center",
  top: 0,
  left: 0,
  opacity: 0,
  "@keyframes bg": {
    "0%": {
      opacity: 0,
      transform: "scaleX(0) translateX(-5%)",
    },
    "30%": {
      transform: "scaleX(1) translateX(0)",
    },
    "100%": {
      transform: "scaleX(1) translateX(0)",
    },
    "30%, 100%": {
      opacity: 1,
    },
  },
  animation: `bg 3s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
  animationDelay: "2s",
});

const HomeMain: React.VFC = () => {
  return (
    <>
      {/* page */}
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* header-wrapper */}
        <Box sx={{ position: "relative", flexGrow: 0, width: "100%" }}>
          {/* header-homepage */}
          <Box
            sx={{
              zIndex: 0,
              position: "relative",
              display: "flex",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <BottomBorderAnime />
            <LeftBorderAnime />
            <RightBorderAnime />
            {/* header-description */}
            <Box
              paddingLeft={5}
              paddingRight={5}
              sx={{ zIndex: 50, position: "relative", width: "100%" }}
            >
              {/* header-description-row */}
              <Box
                sx={{
                  paddingTop: "20%",
                  paddingBottom: "20%",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {/* header-contenet */}
                <Box sx={{ width: "100%" }}>
                  {/* align-holder center */}
                  <MainTitle>
                    <Typography
                      variant="h1"
                      component="div"
                      padding={2}
                      sx={{ flexGrow: 1 }}
                    >
                      K'S Portfolio
                    </Typography>
                  </MainTitle>
                </Box>
              </Box>
            </Box>
            {/* header-homepage-arrow-c */}
            <Box
              sx={{
                position: "absolute",
                alignItems: "center",
                zIndex: 500,
                bottom: 0,
                left: 0,
                right: 0,
                textAlign: "center",
              }}
            >
              <DownAllowIconWrapper>
                <DownAllowIcon>
                  <KeyboardArrowDownIcon fontSize="large" />
                </DownAllowIcon>
              </DownAllowIconWrapper>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomeMain;
