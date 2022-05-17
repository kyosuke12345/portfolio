import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService) { }

  public async authentication(email: string, palinPassword: string) {
    console.log('authentication')
    const user = await this.userService.getByEmail(email);
    const isCorrectPassword = await compare(palinPassword, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
