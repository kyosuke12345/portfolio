import { isNumber, isObject, isString } from "utils/typeguard";

export const ERROR_CODE_FORBIDDEN = 403;
export const ERROR_CODE_AUTHENTICATION = 401;

export type ErrorResponse = {
  status: number;
  url: string;
  message: string;
};

export function isErrorResponse(obj: unknown): obj is ErrorResponse {
  return isObject(obj) && isNumber(obj.status) && isString(obj.url);
}
