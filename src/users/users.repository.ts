import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  getCurrentUser(): User {
    return new User();
  }

  async getById(id: string): Promise<User> {
    return new User();
  }
}
