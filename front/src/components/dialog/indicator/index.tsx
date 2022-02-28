import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
} from "@mui/material";
import { Box } from "@mui/system";

type IndicatorProps = Pick<DialogProps, "open">;

const Indicator: React.VFC<IndicatorProps> = ({ open }) => {
  return (
    <Dialog open={open} disableEscapeKeyDown>
      <DialogContent>
        <Box display={"flex"} justifyContent="center">
          <CircularProgress />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Indicator;
