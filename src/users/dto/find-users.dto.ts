import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class FindUsersDto {
  /**
   * username или email
   */
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  query: string;
}
