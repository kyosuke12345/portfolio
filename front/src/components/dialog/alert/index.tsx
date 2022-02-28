import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@mui/material";

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

export default AlertDialog;
