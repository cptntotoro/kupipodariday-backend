import {
  IsDateString,
  IsPositive,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Offer } from '../../offers/entities/offer.entity';
import { UserPublicProfileResponseDto } from '../../users/dto/user-public-profile-response.dto';

/**
 * Полный класс подарка
 */
export class Wish {
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

  /**
   * Описание
   */
  @MinLength(1)
  @MaxLength(1024)
  description: string;

  /**
   * Ссылка на магазин
   */
  @IsUrl()
  link: string;

  /**
   * Ссылка на изображение
   */
  @IsUrl()
  image: string;

  /**
   * Стоимость с округлением до сотых
   */
  @Min(1)
  price: number;

  /**
   * Текущая сумма собранных средств с округлением до сотых
   */
  @Min(1)
  raised: number;

  /**
   * Сколько раз скопировали другие
   */
  @IsPositive()
  copied: number;

  /**
   * Ссылка на пользователя, который добавил пожелание подарка
   */
  owner: UserPublicProfileResponseDto;

  /**
   * Предложения скинуться на подарок от других пользователей
   */
  offers: Offer[];

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
