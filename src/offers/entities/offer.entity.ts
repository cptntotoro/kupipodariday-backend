import { IsBoolean, IsDate, IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';

@Entity('offers')
export class Offer {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsDate()
  @CreateDateColumn()
  createdAt: Date;

  @IsDate()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @IsNumber()
  @Column({
    type: 'float',
    scale: 2,
    nullable: false,
  })
  amount: number;

  @IsBoolean()
  @Column({ default: false })
  hidden: boolean;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;
}
