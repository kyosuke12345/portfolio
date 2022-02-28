import { PaginationResponse } from "api/response/common.response";
import { Pagination as BasePagination } from "@mui/material";

export type PaginationProps = {
  onChange: (page: number) => void;
  pager: PaginationResponse["pager"];
};

const Pagination: React.VFC<PaginationProps> = ({ pager, onChange }) => {
  return (
    <BasePagination
      count={pager.totalPage}
      page={pager.page}
      onChange={(_event, page) => onChange(page)}
    ></BasePagination>
  );
};

export default Pagination;
