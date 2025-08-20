import {
  IsDateString,
  IsEmail,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Offer } from '../../offers/entities/offer.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

/**
 * Пользователь
 */
export class User {
  /**
   * Идентификатор
   */
  id: number;

  /**
   * Имя пользователя
   */
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username: string;

  /**
   * Описание профиля
   */
  @MinLength(1)
  @MaxLength(200)
  about: string;

  /**
   * Ссылка на аватар профиля
   */
  @IsUrl()
  avatar: string;

  /**
   * Адрес электронной почты
   */
  @IsEmail()
  email: string;

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

  wishes: Wish[];

  offers: Offer[];

  wishlists: Wishlist[];
}
