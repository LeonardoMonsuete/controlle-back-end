import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class MonthlyDebitDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  accountPayableId: number;

  @IsNumber()
  monthId: number;

  @IsOptional()
  @IsBoolean()
  paymentMade: boolean;

  @IsOptional()
  @IsDateString()
  paymentDate?: Date;

  @IsOptional()
  @IsBoolean()
  late: boolean;

  @IsOptional()
  @IsNumber()
  amountPaid?: number;

  @IsDateString()
  createdAt: Date;

  @IsOptional()
  @IsDateString()
  updatedAt: Date;

  @IsOptional()
  @IsDateString()
  deletedAt?: Date;
}
