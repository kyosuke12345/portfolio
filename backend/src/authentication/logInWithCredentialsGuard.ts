import { ConsoleLogger, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginWithCredentialsGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('LoginWithCredentialsGuard')
    // check email password
    if (await super.canActivate(context)) {
      console.log('LoginWithCredentialsGuard 11111')
      // initailize session
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
      console.log('LoginWithCredentialsGuard 2222')

      // if no exceptions were thrown, allow the access to the route
      return true;
    }
    return false;
  }
}