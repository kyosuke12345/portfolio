import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

/**
 * mobileかどうかのCustom Hook
 * @returns
 */
const useMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("lg"));
};

export default useMobile;
