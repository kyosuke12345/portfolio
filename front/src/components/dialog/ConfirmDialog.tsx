import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@mui/material";

export type ConfirmDialogProps = Pick<DialogProps, "open"> & {
  title: string;
  content: string;
  yesButtonTitle?: string;
  closeButtonTitle?: string;
  onCloseClick: () => void;
  onYesClick: () => void;
};

const ConfirmDialog: React.VFC<ConfirmDialogProps> = ({
  open,
  title,
  content,
  closeButtonTitle,
  yesButtonTitle,
  onYesClick,
  onCloseClick,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content} </DialogContent>
      <DialogActions>
        <Button onClick={onYesClick}>{yesButtonTitle}</Button>
        <Button onClick={onCloseClick}>{closeButtonTitle}</Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.defaultProps = {
  yesButtonTitle: "はい",
  closeButtonTitle: "いいえ",
};

export default ConfirmDialog;
