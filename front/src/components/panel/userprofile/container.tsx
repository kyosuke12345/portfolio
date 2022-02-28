import { connect } from "react-redux";
import { RootState } from "redux/rootReducer";
import UserProfilePanel from ".";

const mapStateToProps = (state: RootState) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(UserProfilePanel);
