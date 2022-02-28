import { connect } from "react-redux";
import { RootState } from "redux/rootReducer";
import Indicator from ".";

const mapStateToProps = (state: RootState) => {
  return {
    open: state.loading.open,
  };
};

export default connect(mapStateToProps)(Indicator);
