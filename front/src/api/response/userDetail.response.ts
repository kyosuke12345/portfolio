export type UserDetailResponse = {
  id: number;
  email: string;
  password: string;
  plainPassword: string;
  hobbies: [{ id: number; name: string }];
};
