import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from 'libs/lib/src/database/entities/user.entity';
import { AuthenticationService } from './authentication.service';
import { LoginDTO } from './class/authentication.dto';
import RequestWithUser from './class/authentication.interface';
import { LoginWithCredentialsGuard } from './logInWithCredentialsGuard';

@ApiTags('認証')
@Controller('authentication')
export class AuthenticationController {
  constructor(private service: AuthenticationService) { }


  @ApiOperation({ description: 'login処理' })
  @ApiCreatedResponse({ type: User })
  @ApiUnauthorizedResponse()
  @ApiBody({
    type: LoginDTO
  })
  @UseGuards(LoginWithCredentialsGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser) {
    return req.user;
  }

  @ApiOperation({ description: 'logout処理' })
  @ApiUnauthorizedResponse()
  @Post('logout')
  async logout(@Req() req: RequestWithUser) {
    req.logout();
    req.session.cookie.maxAge = 0;
    return {}
  }
}
