import { Offer } from '../../offers/entities/offer.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

/**
 * Пользователь
 */
@Entity('users')
export class User {
  /**
   * Идентификатор
   */
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  /**
   * Имя пользователя
   */
  // TODO: В задаче не как в сваггере: 2-30 символов
  @IsString()
  @Length(1, 64)
  @Index()
  @Column({
    length: 64,
    unique: true,
    nullable: false,
  })
  username: string;

  /**
   * Описание профиля
   */
  // TODO: В задаче не как в сваггере: 2-200 символов
  //  По умоллчанию: "Пока ничего не рассказал о себе"
  @Length(1, 200)
  @IsString()
  @Column({
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  about: string;

  /**
   * Ссылка на аватар профиля
   */
  @IsUrl()
  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  /**
   * Адрес электронной почты
   */
  @IsEmail()
  @Index()
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  /**
   * Список желаемых подарков
   */
  @Column({
    array: true,
  })
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  /**
   * Список подарков, на которые скидывается пользователь
   */
  @Column({
    array: true,
  })
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  /**
   * Списки желаемого, которые создал пользователь
   */
  @Column({
    array: true,
  })
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];

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
