import {
  IsDateString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Offer } from '../../offers/entities/offer.entity';
import { UserPublicProfileResponseDto } from '../../users/dto/user-public-profile-response.dto';

export class Wish {
  id: number;

  @IsDateString()
  createdAt: string; // format: date-time

  @IsDateString()
  updatedAt: string; // format: date-time

  @MinLength(1)
  @MaxLength(250)
  name: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @Min(1)
  price: number;

  @Min(1)
  raised: number;
  copied: number;

  @MinLength(1)
  @MaxLength(1024)
  description: string;

  owner: UserPublicProfileResponseDto;

  offers: Offer[];
}
