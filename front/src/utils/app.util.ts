import { USER_ROLE } from "api/const";

export function isAdmin(role?: typeof USER_ROLE[keyof typeof USER_ROLE]) {
  return role === USER_ROLE.ADMIN;
}
