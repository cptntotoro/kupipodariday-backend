import { IsDateString, IsEmail, IsString, IsUrl, MaxLength, Min, MinLength } from 'class-validator';
import { Offer } from '../../offers/entities/offer.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

export class User {
  id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username: string;

  @MinLength(1)
  @MaxLength(200)
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @IsDateString()
  createdAt: string; // format: date-time

  @IsDateString()
  updatedAt: string; // format: date-time

  wishes: Wish[];

  offers: Offer[];

  wishlists: Wishlist[];
}