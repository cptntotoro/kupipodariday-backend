import {
  IsDateString,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * DTO публичного профиля {@link User}
 */
export class UserPublicProfileResponseDto {
  id: number;

  // TODO: Убрать валидацию ДТО ответа

  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username: string;

  @MinLength(1)
  @MaxLength(200)
  about: string;

  @IsUrl()
  avatar: string;

  @IsDateString()
  createdAt: string; // format: date-time

  @IsDateString()
  updatedAt: string; // format: date-time
}
