import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/database/entities/user.entity";
import { PaginationListResponse } from "src/utils/common.response.util";

export class UserListItemResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  plainPassword: string;
}

export class UserListResponse extends PaginationListResponse<UserListItemResponse> {
  constructor(items: UserListItemResponse[], page: number, per: number, total: number) {
    super(items, page, per, total);
  }
}

export class HobbiesItemResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

export class UserDetailResponse extends UserListItemResponse {
  @ApiProperty({ description: '趣味リスト', isArray: true, type: HobbiesItemResponse })
  hobbies: HobbiesItemResponse[]

  constructor(user: User) {
    super()
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.plainPassword = user.plainPassword;
    this.hobbies = [];
    for (const hobby of user.hobbies) {
      this.hobbies.push({
        id: hobby.id,
        name: hobby.name
      })
    }
  }
}