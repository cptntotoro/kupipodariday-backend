import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { SigninUserResponseDto } from './dto/signin-user-response.dto';
import { SignupUserResponseDto } from './dto/signup-user-response.dto';
import { User } from '../users/entities/user.entity';
import { TransformUtil } from '../utils/transform.util';
import { UsersService } from '../users/users.service';
import { HashService } from '../hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<SignupUserResponseDto> {
    const existing = await this.usersService.findByUsernameOrEmail(
      createUserDto.username,
      createUserDto.email,
    );
    if (existing) throw new ConflictException('User already exists');

    const hashedPassword = await this.hashService.hashPassword(
      createUserDto.password,
    );
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
      roles: ['user'],
    } as User);
    return TransformUtil.toDto(SignupUserResponseDto, user);
  }

  async login(signinUserDto: SigninUserDto): Promise<SigninUserResponseDto> {
    const user = await this.usersService.findByUsernameOrEmail(
      signinUserDto.username,
    );
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByUsernameOrEmail(username);
    if (user && (await this.hashService.comparePassword(pass, user.password))) {
      return user;
    }
    return null;
  }
}
