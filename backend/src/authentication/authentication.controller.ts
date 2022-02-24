import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from 'src/database/entities/user.entity';
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
}
