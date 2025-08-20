import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsOptional } from 'class-validator/types/decorator/common/IsOptional';

export class SignUpUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username: string;

  @IsOptional()
  @MinLength(0) // мб 1?
  @MaxLength(200)
  about: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(2)
  password: string;

  // public get fullName() {
  //     return this.firstName + this.lastName;
  // }
}
