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
  // TODO: В задаче не как в сваггере: 2-30 символов
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username: string;

  /**
   * Описание профиля
   */
  // TODO: В задаче не как в сваггере: 2-200 символов
  //  По умоллчанию: "Пока ничего не рассказал о себе"
  @MinLength(1)
  @MaxLength(200)
  about: string;

  /**
   * Ссылка на аватар профиля
   */
  // TODO: По умоллчанию: https://i.pravatar.cc/300
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

  /**
   * Список желаемых подарков
   */
  wishes: Wish[];

  /**
   * Список подарков, на которые скидывается пользователь
   */
  offers: Offer[];

  /**
   * Списки желаемого, которые создал пользователь
   */
  wishlists: Wishlist[];
}
