import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CookieAuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = request.isAuthenticated() as boolean;
    return isAuthenticated;
  }
}