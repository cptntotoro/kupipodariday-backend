import { IsDateString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { WishPartial } from '../../wishes/entities/wishPartial.entity';
import { UserPublicProfileResponseDto } from '../../users/dto/user-public-profile-response.dto';

/**
 * Список желаемого
 */
export class Wishlist {
  /**
   * Идентификатор
   */
  id: number;

  /**
   * Название
   */
  @MinLength(1)
  @MaxLength(250)
  name: string;

  // TODO: Этого не было в сваггере
  @MinLength(1)
  @MaxLength(1500)
  description: string;

  /**
   * Ссылка на картинку
   */
  @IsUrl()
  image: string;

  /**
   * DTO публичного профиля {@link User}
   */
  owner: UserPublicProfileResponseDto;

  /**
   * Подарки
   */
  items: WishPartial[];

  /**
   * Дата и время создания
   */
  @IsDateString()
  createdAt: string; // format: date-time

  /**
   * Дата и время обновления
   */
  @IsDateString()
  updatedAt: string; // format: date-time
}
