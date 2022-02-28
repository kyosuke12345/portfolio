import { PaginationResponse } from "./common.response";

type UserListItemResponse = {
  id: number;
  email: string;
  password: string;
  plainPassword: string;
};

export type UserListResponse = PaginationResponse & {
  items: UserListItemResponse[];
};
