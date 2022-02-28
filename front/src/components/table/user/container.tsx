import { DEFAULT_PAGER } from "api/response/common.response";
import { connect } from "react-redux";
import { RootState } from "redux/rootReducer";
import { AppDispatch } from "redux/store";
import { search, USER_LIST_PAGE_PER } from "redux/modules/userListModule";
import UserListTable from ".";

const mapStateToProps = (state: RootState) => {
  return {
    items: state.userList.listResponse ? state.userList.listResponse.items : [],
    pager: state.userList.listResponse
      ? state.userList.listResponse.pager
      : DEFAULT_PAGER.pager,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onChange: (page: number) => dispatch(search(page, USER_LIST_PAGE_PER)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListTable);
