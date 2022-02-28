import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
} from "@mui/material";
import { Box } from "@mui/system";
import { connect } from "react-redux";
import { RootState } from "redux/rootReducer";

type LoadingDialogProps = Pick<DialogProps, "open">;

const LoadingDialog: React.VFC<LoadingDialogProps> = ({ open }) => {
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

const mapStateToProps = (state: RootState) => {
  return {
    open: state.loading.open,
  };
};

export default connect(mapStateToProps)(LoadingDialog);
