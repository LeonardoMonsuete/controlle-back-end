import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';
import { AccountsPayableDto } from './accounts-payable.dto';
import { MonthsDto } from './months.dto';

export class MonthlyDebitDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  accountPayableId: number;

  @IsOptional()
  accountPayable?: AccountsPayableDto;

  @IsNumber()
  monthId: number;

  @IsOptional()
  month?: MonthsDto;

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
