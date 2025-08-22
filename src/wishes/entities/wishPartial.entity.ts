import {
  IsDateString, IsDecimal, IsNumber,
  IsPositive, IsString,
  IsUrl, Length,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * Неполный класс подарка
 */
@Entity('wishes')
export class WishPartial {
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
    nullable: false,
  })
  name: string;

  /**
   * Описание
   */
  @IsString()
  @Length(1, 1024)
  @Column({
    length: 1024,
  })
  description: string;

  /**
   * Ссылка на магазин
   */
  @IsUrl()
  @Column({
    nullable: false,
  })
  link: string;

  /**
   * Ссылка на изображение
   */
  @IsUrl()
  @Column({
    nullable: false,
  })
  image: string;

  /**
   * Стоимость с округлением до сотых
   */
  @Min(1)
  @IsDecimal()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  /**
   * Текущая сумма собранных средств с округлением до сотых
   */
  @Min(1)
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  raised: number;

  /**
   * Сколько раз скопировали другие
   */
  @IsNumber()
  @Column({
    default: 0,
  })
  copied: number;

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
