import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from '../wishes/entities/wish.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { UserWishesDto } from '../wishes/dto/user-wishes.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UserRequestInfo } from '../auth/auth-request';
import { WishDto } from '../wishes/dto/wish.dto';
import { TransformUtil } from '../utils/transform.util';
import { HashService } from '../hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    private hashService: HashService,
  ) {}

  async findOwn(userInfo: UserRequestInfo): Promise<UserProfileResponseDto> {
    if (!userInfo) throw new UnauthorizedException('User not authenticated');
    const found = await this.userRepository.findOne({
      where: { id: userInfo.userId },
    });
    if (!found) throw new NotFoundException();
    return TransformUtil.toDto(UserProfileResponseDto, found);
  }

  async update(
    updateUserDto: UpdateUserDto,
    userInfo: UserRequestInfo,
  ): Promise<UserProfileResponseDto> {
    if (!userInfo) throw new UnauthorizedException('User not authenticated');
    if (!!updateUserDto.username || !!updateUserDto.email) {
      const users = await this.userRepository.find({
        where: [
          { email: updateUserDto.email },
          { username: updateUserDto.username },
        ],
      });
      if (
        !!users.length &&
        users.some((value) => value.id != userInfo.userId)
      ) {
        throw new ConflictException(
          'The name or email is occupied by another user',
        );
      }
    }
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashService.hashPassword(
        updateUserDto.password,
      );
    }
    await this.userRepository.update({ id: userInfo.userId }, updateUserDto);
    return this.findOwn(userInfo);
  }

  async getOwnWishes(userInfo: UserRequestInfo): Promise<WishDto[]> {
    if (!userInfo) throw new UnauthorizedException('User not authenticated');
    const wishes = await this.wishRepository.find({
      where: { owner: { id: userInfo.userId } },
      relations: ['owner', 'offers'],
    });
    return TransformUtil.toDtoArray(WishDto, wishes);
  }

  async findOne(username: string): Promise<UserPublicProfileResponseDto> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new NotFoundException();
    return TransformUtil.toDto(UserPublicProfileResponseDto, user);
  }

  async getWishes(username: string): Promise<UserWishesDto[]> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new NotFoundException();
    const wishes = await this.wishRepository.find({
      where: { owner: { id: user.id } },
      relations: ['offers'],
    });
    return TransformUtil.toDtoArray(UserWishesDto, wishes);
  }

  async findMany(
    findUsersDto: FindUsersDto,
  ): Promise<UserPublicProfileResponseDto[]> {
    if (!findUsersDto.query?.length) {
      return [];
    }
    const users = await this.userRepository.find({
      where: [
        { email: Like(`%${findUsersDto.query}%`) },
        { username: Like(`%${findUsersDto.query}%`) },
      ],
    });
    return TransformUtil.toDtoArray(UserPublicProfileResponseDto, users);
  }

  async findByUsernameOrEmail(username: string, email?: string) {
    return this.userRepository.findOne({
      where: [{ username: username }, { email: email }],
    });
  }

  async create(user: User) {
    return await this.userRepository.save(user);
  }
}
