import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'libs/lib/src/database/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    console.log('local serializeUser')
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    console.log('local deserializeUser')
    const user = await this.userService.getById(Number(userId));
    done(null, user);
  }
}