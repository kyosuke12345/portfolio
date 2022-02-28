import { connect } from "react-redux";
import alertDialogModule from "redux/modules/alertDialogModule";
import { RootState } from "redux/rootReducer";
import { AppDispatch } from "redux/store";
import AlertDialog from ".";

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
