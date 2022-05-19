import { connect } from "react-redux";
import { RootState } from "redux/rootReducer";
import CryptocurrencyMasterTable from ".";

const mapStateToProps = (state: RootState) => {
  return {
    items: state.cryptocurrencyMaster.response
      ? state.cryptocurrencyMaster.response.items
      : [],
  };
};

// const mapDispatchToProps = (dispatch: AppDispatch) => {
//   return {
//     onChange: (page: number) => dispatch(search(page, USER_LIST_PAGE_PER)),
//   };
// };
const CryptocurrencyMasterTableContainer = connect(mapStateToProps)(
  CryptocurrencyMasterTable
);
export default CryptocurrencyMasterTableContainer;
