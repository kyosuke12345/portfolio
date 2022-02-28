export type PaginationResponse = {
  pager: {
    page: number;
    total: number;
    per: number;
    totalPage: number;
  };
};

export const DEFAULT_PAGER: PaginationResponse = {
  pager: {
    page: 0,
    total: 0,
    per: 0,
    totalPage: 0,
  },
};
