import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { ApplicationConfig } from '@nestjs/core';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from '../wishes/entities/wish.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  @Inject('CONFIG')
  private config: ApplicationConfig;

  // или параметр конструктора
  // constructor(@Inject('CONFIG') config: ApplicationConfig) {}

  // constructor(
  //   @InjectRepository(User)
  //   private studentRepository: Repository<User>,
  // ) {}

  constructor(private readonly usersRepository: UsersRepository) {
  }

  getCurrentUser(): UserProfileResponseDto {
    return new UserProfileResponseDto();
  }

  /**
   * Получить пользователя по идентификатору
   * @param id Идентификатор
   */
  async getById(id: number): Promise<User> {
    return await this.usersRepository.getById(id);
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
