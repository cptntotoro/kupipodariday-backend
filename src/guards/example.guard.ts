import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class MyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHTTP().getRequest();
    const token = request.header('Authorization');
    // isAuthorize - условный метод (реализация опущена)
    // он проверяет корректность токена и возвращает true/false
    return isAuthorizaed(token);
  }
}