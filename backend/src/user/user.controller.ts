import { Body, Controller, Post, Get, Param, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import RequestWithUser from 'src/authentication/class/authentication.interface';
import { CookieAuthenticationGuard } from 'src/authentication/cookieAuthentication.guard';
import { AddHobbyDTO, RemoveHobbyDTO } from './class/user.dto';
import { UserDetailResponse, UserListResponse } from './class/user.response';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private service: UserService) { }

  @ApiOkResponse({ description: 'list取得時', type: UserListResponse })
  @ApiParam({ name: 'page', required: true })
  @ApiParam({ name: 'per', required: true })
  @Get('list/:page/:per')
  async list(@Param('page', new ParseIntPipe()) page: number, @Param('per', new ParseIntPipe()) per: number) {
    return this.service.list(page, per);
  }

  @UseGuards(CookieAuthenticationGuard)
  @ApiOkResponse({ description: '詳細取得取得時', type: UserDetailResponse })
  @ApiNotFoundResponse({ description: 'not found user' })
  @ApiForbiddenResponse()
  @Get('detail')
  async detail(@Req() req: RequestWithUser) {
    return this.service.detail(req.user.id);
  }

  @UseGuards(CookieAuthenticationGuard)
  @ApiCreatedResponse({ type: UserDetailResponse })
  @ApiForbiddenResponse()
  @Post('add-hobbies')
  async addHobies(@Body() dto: AddHobbyDTO, @Req() req: RequestWithUser) {
    await this.service.addHobies(req.user, dto);
    return this.service.detail(req.user.id);
  }

  @UseGuards(CookieAuthenticationGuard)
  @ApiCreatedResponse({ type: UserDetailResponse })
  @ApiForbiddenResponse()
  @Post('remove-hobbies')
  async removeHobbies(@Body() dto: RemoveHobbyDTO, @Req() req: RequestWithUser) {
    await this.service.removeHobbies(req.user, dto);
    return this.service.detail(req.user.id);
  }

}
