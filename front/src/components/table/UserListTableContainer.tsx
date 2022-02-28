import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
} from "@mui/material";
import { DEFAULT_PAGER } from "api/response/common.response";
import { UserListResponse } from "api/response/userList.response";
import Pagination, { PaginationProps } from "components/pagenation/pagination";
import { connect } from "react-redux";
import { RootState } from "redux/rootReducer";
import { AppDispatch } from "redux/store";
import { search, USER_LIST_PAGE_PER } from "redux/modules/userListModule";

export type UserListTableProps = {
  pager: UserListResponse["pager"];
  items: UserListResponse["items"];
  onChange: PaginationProps["onChange"];
};

const UserListTable: React.VFC<UserListTableProps> = ({
  pager,
  items,
  onChange,
}) => {
  return (
    <>
      <Pagination pager={pager} onChange={onChange} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>email</TableCell>
              <TableCell>password</TableCell>
              <TableCell>plainPassword</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.password}</TableCell>
                <TableCell>{item.plainPassword}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination pager={pager} onChange={onChange} />
    </>
  );
};

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
