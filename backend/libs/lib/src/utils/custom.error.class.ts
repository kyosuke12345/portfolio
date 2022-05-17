import { HttpException } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export class DuplicateUniqueKeyException extends HttpException {
  constructor(message: string = "") {
    super(message, 450);
  }
}

export const ApiDuplicateuniqueKeyErrorResponse = (description?: string) => {
  return ApiResponse({
    status: 450,
    description: description ?? 'unique key duplicate'
  })
} 