import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getCurrentUser(): User {
    return new User();
  }

  async getById(id: number): Promise<User> {
    const user = this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username', 'about', 'avatar', 'email', 'createdAt'],
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }
}
