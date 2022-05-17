import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginWithCredentialsGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check email password
    if (await super.canActivate(context)) {
      // initailize session
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);

      // if no exceptions were thrown, allow the access to the route
      return true;
    }
    return false;
  }
}