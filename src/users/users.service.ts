import {Inject, Injectable} from '@nestjs/common';
import {UsersRepository} from "./users.repository";
import {ApplicationConfig} from "@nestjs/core";
import {UserProfileResponseDto} from "./dto/user-profile-response.dto";

@Injectable()
export class UsersService {
  @Inject('CONFIG')
  private config: ApplicationConfig;

  // или параметр конструктора
  // constructor(@Inject('CONFIG') config: ApplicationConfig) {}

  constructor(private readonly usersRepository: UsersRepository) {}

  getCurrentUser() : UserProfileResponseDto {
    return "";
  }

  async get(id: string) {
    const user = await this.usersRepository.get(id);

    delete user.password;

    return user;
  }
}
