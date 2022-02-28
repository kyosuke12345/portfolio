import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
} from "@mui/material";
import { UserListResponse } from "api/response/userList.response";
import Pagination, { PaginationProps } from "components/pagenation/index";

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

export default UserListTable;
