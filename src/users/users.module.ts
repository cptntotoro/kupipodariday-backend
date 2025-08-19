import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {UsersRepository} from "./users.repository";
import {ApplicationConfig} from "@nestjs/core";

const configProvider = {
  provide: 'CONFIG', // идентификатор, который сможем использовать для внедрения конфигурации
  useValue: applicationConfig,
}

const databaseProvider = {
  provide: 'DATABASE',
  useFactory: (config: ApplicationConfig) => {
    const options = {
      url: config.DATABASE_URL,
      dbName: config.DATABASE_NAME,
    };

    return new DatabaseConnection(options);
  },
  // можем указать зависимости, которые нужны для функции-фабрики
  inject: [{ token: 'CONFIG' }]
}

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, configProvider, databaseProvider],
})
export class UsersModule {}
