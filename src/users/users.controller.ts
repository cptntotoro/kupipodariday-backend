import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  getCurrentUser(): UserProfileResponseDto {
    return this.userService.getCurrentUser();
  }

  @Patch('me')
  updateCurrentUser(
    @Body() updateUserDto: UpdateUserDto,
  ): UserProfileResponseDto {
    // Валидировать тело

    const name = updateUserDto?.name;
    return;
  }

  @Get('me/wishes')
  getCurrentUserWishes(): string {
    return this.appService.getHello();
  }

  @Get(':username')
  getUserByUsername(@Param('username') username: string): string {
    return this.appService.getHello();
  }

  @Get(':username/wishes')
  getUserWishesByUsername(@Param('username') username: string): string {
    return this.appService.getHello();
  }

  @Post('find')
  @HttpCode(201)
  findUser(@Body() body: { [key: string]: unknown }): string {
    const query = body?.query;
  }
}
