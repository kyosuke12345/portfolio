import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Box,
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
      <Box sx={{ mb: 1 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>email</TableCell>
                <TableCell>plainPassword</TableCell>
                <TableCell>password</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.plainPassword}</TableCell>
                  <TableCell>{item.password}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Pagination pager={pager} onChange={onChange} />
    </>
  );
};

export default UserListTable;
