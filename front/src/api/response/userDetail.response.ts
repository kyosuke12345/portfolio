import { USER_ROLE } from "api/const";

export type UserDetailResponse = {
  id: number;
  email: string;
  password: string;
  plainPassword: string;
  hobbies: [{ id: number; name: string }];
  role: typeof USER_ROLE[keyof typeof USER_ROLE];
};
