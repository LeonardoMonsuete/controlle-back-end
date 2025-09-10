import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AccountsReceivableDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isFixed: boolean;

  @IsOptional()
  @IsDateString()
  startEntry?: Date;

  @IsOptional()
  @IsDateString()
  endEntry?: Date;

  @IsOptional()
  @IsBoolean()
  expired: boolean;

  @IsNumber()
  amount: number;

  @IsDateString()
  createdAt: Date;

  @IsOptional()
  @IsDateString()
  updatedAt: Date;

  @IsOptional()
  @IsDateString()
  deletedAt?: Date;
}
