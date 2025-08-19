import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Добавим глобальный пайплайн валидации на следующей строке
  // К примеру, если мы сразу добавим метод в этот класс,
  // он не будет доступен в контроллере.
  // Чтобы изменить это поведение, достаточно указать опцию transform для ValidationPipe:
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
