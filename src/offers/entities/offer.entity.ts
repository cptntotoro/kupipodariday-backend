import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';
import { IsBoolean, IsDecimal, IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Предложение скинуться на подарок
 */
export class Offer {
  /**
   * Идентификатор
   */
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Подарок
   */
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  /**
   * Сумма заявки, округляется до сотых
   */
  @IsDecimal()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  amount: number;

  /**
   * Флаг отображения информации о скидывающемся в списке
   */
  @IsBoolean()
  @Column({
    nullable: false,
    default: false,
  })
  hidden: boolean;

  /**
   * Пользователь
   */
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  /**
   * Дата и время создания
   */
  // @IsDateString()
  @CreateDateColumn()
  createdAt: Date; // format: date-time

  /**
   * Дата и время обновления
   */
  // @IsDateString()
  @UpdateDateColumn()
  updatedAt: Date; // format: date-time
}
