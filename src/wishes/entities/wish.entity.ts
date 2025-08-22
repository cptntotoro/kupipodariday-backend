import { Offer } from '../../offers/entities/offer.entity';
import { Column, ManyToOne, OneToMany } from 'typeorm';
import { WishPartial } from './wishPartial.entity';
import { User } from '../../users/entities/user.entity';

/**
 * Полный класс подарка
 */
export class Wish extends WishPartial {
  // /**
  //  * Идентификатор
  //  */
  // @PrimaryGeneratedColumn()
  // id: number;
  //
  // /**
  //  * Название
  //  */
  // // @MinLength(1)
  // // @MaxLength(250)
  // @Column({
  //   length: 250,
  //   nullable: false,
  // })
  // name: string;
  //
  // /**
  //  * Описание
  //  */
  // // @MinLength(1)
  // // @MaxLength(1024)
  // @Column({
  //   length: 1024,
  // })
  // description: string;

  // /**
  //  * Ссылка на магазин
  //  */
  // // @IsUrl()
  // @Column({
  //   nullable: false,
  // })
  // link: string;
  //
  // /**
  //  * Ссылка на изображение
  //  */
  // @IsUrl()
  // @Column({
  //   nullable: false,
  // })
  // image: string;

  // /**
  //  * Стоимость с округлением до сотых
  //  */
  // @Min(1)
  // @Column({
  //   precision: 2,
  // })
  // price: number;
  //
  // /**
  //  * Текущая сумма собранных средств с округлением до сотых
  //  */
  // @Min(1)
  // @Column({
  //   precision: 2,
  // })
  // raised: number;
  //
  // /**
  //  * Сколько раз скопировали другие
  //  */
  // @IsPositive()
  // copied: number;

  /**
   * Ссылка на пользователя, который добавил пожелание подарка
   */
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  /**
   * Предложения скинуться на подарок от других пользователей
   */
  @Column({
    array: true,
  })
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  // /**
  //  * Дата и время создания
  //  */
  // // @IsDateString()
  // @CreateDateColumn()
  // createdAt: string; // format: date-time
  //
  // /**
  //  * Дата и время обновления
  //  */
  // // @IsDateString()
  // @UpdateDateColumn()
  // updatedAt: string; // format: date-time
}
