import {
  IsDateString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { WishPartial } from '../../wishes/entities/wishPartial.entity';
import { UserPublicProfileResponseDto } from '../../users/dto/user-public-profile-response.dto';

export class Wishlist {
  id: number;

  @IsDateString()
  createdAt: string; // format: date-time

  @IsDateString()
  updatedAt: string; // format: date-time

  @MinLength(1)
  @MaxLength(250)
  name: string;

  @IsUrl()
  image: string;

  owner: UserPublicProfileResponseDto;

  items: WishPartial[];
}
