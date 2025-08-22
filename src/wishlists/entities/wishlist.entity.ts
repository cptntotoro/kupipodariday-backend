import {
  IsDateString,
  IsNumber,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsOptional } from 'class-validator/types/decorator/common/IsOptional';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';

/**
 * Список желаемого
 */
@Entity('wishlists')
export class Wishlist {
  /**
   * Идентификатор
   */
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Название
   */
  @IsString()
  @Length(1, 250)
  @Column({
    length: 250,
  })
  name: string;

  // TODO: Этого не было в сваггере
  @IsString()
  @Length(1, 1500)
  @IsOptional()
  @Column({
    nullable: true,
    length: 1500,
  })
  description: string;

  /**
   * Ссылка на картинку
   */
  @IsUrl()
  @IsOptional()
  @Column({
    nullable: true,
  })
  image: string;

  /**
   * Пользователь
   */
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  /**
   * Подарки
   */
  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];

  /**
   * Дата и время создания
   */
  @IsDateString()
  createdAt: Date; // format: date-time

  /**
   * Дата и время обновления
   */
  @IsDateString()
  updatedAt: Date; // format: date-time
}
