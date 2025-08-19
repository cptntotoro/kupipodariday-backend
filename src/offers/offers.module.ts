import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import {UsersController} from "../users/users.controller";
import {UsersService} from "../users/users.service";
import {UsersRepository} from "../users/users.repository";

@Module({
  imports: [],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}