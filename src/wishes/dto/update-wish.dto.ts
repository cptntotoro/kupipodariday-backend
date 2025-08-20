import { IsString, IsUrl, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateWishDto {
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @Min(1)
  price: number;
}
