import { IsBoolean, Min } from 'class-validator';
import { IsOptional } from 'class-validator/types/decorator/common/IsOptional';

export class CreateOfferDto {
  @Min(1)
  amount: number;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  itemId: number;
}
