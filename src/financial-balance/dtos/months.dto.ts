import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class MonthsDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  monthNumber: number;

  @IsString()
  @MaxLength(20)
  monthName: string;

  @IsNumber()
  yearId: number;

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
