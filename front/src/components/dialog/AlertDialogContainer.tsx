import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import { connect } from "react-redux";
import alertDialogModule from "redux/modules/alertDialogModule";
import { RootState } from "redux/rootReducer";
import { AppDispatch } from "redux/store";

export type AlertDialogProps = Pick<DialogProps, "open"> & {
  title: string;
  content: string;
  closeButtonTitle?: string;
  onCloseClick: () => void;
};

const AlertDialog: React.VFC<AlertDialogProps> = ({
  open,
  title,
  content,
  closeButtonTitle,
  onCloseClick,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content} </DialogContent>
      <DialogActions>
        <Button onClick={onCloseClick}>{closeButtonTitle}</Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.defaultProps = {
  closeButtonTitle: "はい",
};

const mapStateToProps = (state: RootState) => {
  return {
    open: state.alert.open,
    title: state.alert.title,
    content: state.alert.content,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onCloseClick: () => dispatch(alertDialogModule.actions.hideAlertDialog()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
