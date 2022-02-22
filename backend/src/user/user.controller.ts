import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AddHobbyDTO } from './class/user.dto';
import { UserDetailResponse, UserListResponse } from './class/user.response';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private service: UserService) { }

  @ApiOkResponse({ description: 'list取得時', type: UserListResponse })
  @Get('list/:page/:per')
  async list(@Param('page') page: number, @Param('per') per) {
    return this.service.list(page, per);
  }

  // TODO 認証
  @ApiOkResponse({ description: '詳細取得取得時', type: UserDetailResponse })
  @ApiNotFoundResponse({ description: 'not found user' })
  @Get('detail/:id')
  async detail(@Param('id') id: number) {
    return this.service.detail(id);
  }

  // TODO 認証
  @ApiCreatedResponse({ description: '作成完了時のレスポンスコード' })
  @Post('add-hobbies')
  async addHobies(@Body() dto: AddHobbyDTO) {
    // TODO 仮
    return {};
  }

}
