import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { ApplicationConfig } from '@nestjs/core';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from '../wishes/entities/wish.entity';

@Injectable()
export class UsersService {
  @Inject('CONFIG')
  private config: ApplicationConfig;

  // или параметр конструктора
  // constructor(@Inject('CONFIG') config: ApplicationConfig) {}

  constructor(private readonly usersRepository: UsersRepository) {}

  getCurrentUser(): UserProfileResponseDto {
    return new UserProfileResponseDto();
  }

  /**
   * Получить пользователя по идентификатору
   * @param id Идентификатор
   */
  async get(id: string) {
    const user = await this.usersRepository.getById(id);
    return user;
  }

  /**
   * Обновить текущего пользователя
   * @param updateUserDto Обновленный пользователь
   */
  update(updateUserDto: UpdateUserDto): UserProfileResponseDto {
    return new UserProfileResponseDto();
  }

  /**
   * Получить желания текущего пользователя
   */
  getCurrentUserWishes(): Wish[] {
    return new Wish[];
  }
}
