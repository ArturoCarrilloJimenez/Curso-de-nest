import { IsString, MinLength } from 'class-validator';

export class UpdateBrandDto {
  @IsString()
  @MinLength(3)
  name: string;
}
