import { Offer } from '../../offers/entities/offer.entity';
import { IsDateString, IsString, IsUrl, MaxLength, Min, MinLength } from 'class-validator';

export class UserWishesDto {
    id: number;

    @IsString()
    @MinLength(1)
    @MaxLength(250)
    name: string;

    @IsString()
    @MinLength(1)
    @MaxLength(1024)
    description: string;

    @IsUrl()
    link: string;

    @IsUrl()
    image: string;

    @Min(1)
    price: number;

    @Min(1)
    raised: number;

    copied: number;

    offers: Offer[];

    @IsDateString()
    createdAt: string; // format: date-time

    @IsDateString()
    updatedAt: string; // format: date-time
}