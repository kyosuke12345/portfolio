import { UserRole } from '@lib/lib/database/entities/dbType';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import RequestWithUser from './class/authentication.interface';

@Injectable()
export class CookieAuthenticationAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = request.isAuthenticated() as boolean;
    if (isAuthenticated) {
      const user = (request as RequestWithUser).user;
      return user.role === UserRole.Admin;
    }
    return false;
  }
}