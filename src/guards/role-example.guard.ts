import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
// Это специальный класс, единственное предназначение которого — определять,
// должен запрос пользователя быть обработан или нет.
// Гарды отмечаются декоратором @Injectable
// и должны имплементировать интерфейс CanActivate
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // если у обработчика нет данных о ролях, пропускаем запрос в контроллер
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // если у пользователя есть хотя бы одна нужная роль, запрос пройдёт дальше
    return roles.some(role => user.roles.includes(role));
  }
}

// Осталось на основе метаданных контекста выполнения решить, передавать запрос в контроллер или нет.
// Чтобы получить метаданные внутри гарды, понадобится класс Reflector из пакета @nestjs/core.
// А чтобы получить текущий обработчик (метод контроллера), воспользуйтесь методом контекста getHandler


// Пример контролера:

// import { Controller, Post, UseGuards, SetMetadata } from '@nestjs/common';
// import { RolesGuard } from '../guards/roles.guard';
//
// @Controller('posts')
// @UseGuards(RolesGuard)
// export class PostsController {
//   @Post()
//   // посты могут создавать только пользователи с ролью admin
//   @SetMetadata('roles', ['admin'])
//   create() {
//     return 'This action will create a post';
//   }
// }