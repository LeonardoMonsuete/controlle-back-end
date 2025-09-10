import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class YearsDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  yearNumber: number;

  @IsOptional()
  @IsBoolean()
  closed: boolean;

  @IsDateString()
  createdAt: Date;

  @IsOptional()
  @IsDateString()
  updatedAt: Date;

  @IsOptional()
  @IsDateString()
  deletedAt?: Date;
}
