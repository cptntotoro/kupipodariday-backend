import {Body, Controller, Get, Header, HttpCode, Param, Post, Put, Redirect, Req} from '@nestjs/common';
import { OffersService } from './offers.service';

@Controller('users')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  create(@Headers() headers): string {
    const contentType = headers['user-agent'];

    return `Создаём нового пользователя. А заголовок user-agent равен "${userAgent}"`;  }

  @Put()
  update(@Headers('user-agent') userAgent: string) {
    return `А этот метод API обновит его данные. А заголовок user-agent равен "${userAgent}"`;
  }

  // Вот ещё некоторые доступные параметры:
  // @Res() — объект ответа (тип Response из Express);
  // @Param(name?: string) — параметр URL;
  // @Query(key?: string) — GET-параметры запроса;
  // @Body(key?: string) — тело запроса.

  @Get(':id') // роут будет обрабатывать запросы вида GET /users/123
  find(@Param('id') id: string): string {
    return `Этот метод вернёт данные пользователя с id ${id}`;
  }

  @Get('byId/*') // роут будет обрабатывать запросы вида GET /users/byId/any-string
  findById(): string {
    return 'Метод вернёт пользователя по переданному в url id';
  }

  @Get('*') // роут будет обрабатывать запросы вида GET /users/any-string
  find(): string {
    return 'Этот метод обработает любые запросы к /users/*';
  }

  @Post()
  create(@Body() body: { [key: string]: unknown }): string {
  const name = body?.name;

  return `Метод создаст пользоватетеля с именем ${name}`;
}

  @Put(':id')
  update(@Body('name') name: string, @Param('id') id: string) {
  return `Метод изменит имя на ${name} для пользователя с id ${id}`;
  }

  @Get()
  @HttpCode(204) // 204 — No Content
  @Header('Content-Type', 'text/plain')
  @Redirect('/cards', 301)
  findAll(): string {
    return 'Пользователей нет  :(';
  }

  @Get()
  @Redirect()
  findAll(): string {
    return {
      url: '/cards',
      statusCode: 301,
    };
  }
}
