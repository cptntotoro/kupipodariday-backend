import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { HashModule } from '../hash/hash.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wish]), HashModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
