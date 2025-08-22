import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';
import { IsDateString } from 'class-validator';

/**
 * Предложение скинуться на подарок
 */
export class Offer {
  /**
   * Идентификатор
   */
  id: number;

  /**
   * Подарок
   */
  item: Wish;

  /**
   * Сумма заявки, округляется до сотых
   */
  amount: number;

  /**
   * Флаг отображения информации о скидывающемся в списке
   */
    // TODO: по умолчанию - false
  hidden: boolean;

  /**
   * Пользователь
   */
  user: User;

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
