import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AccountsPayableDto {
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
  startPayment?: Date;

  @IsOptional()
  @IsDateString()
  endPayment?: Date;

  @IsOptional()
  @IsBoolean()
  expired: boolean;

  @IsOptional()
  @IsNumber()
  installmentAmount?: number;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsNumber()
  installmentsCount?: number;

  @IsOptional()
  @IsBoolean()
  hasInterest?: boolean;

  @IsDateString()
  createdAt: Date;

  @IsOptional()
  @IsDateString()
  updatedAt: Date;

  @IsOptional()
  @IsDateString()
  deletedAt?: Date;
}
