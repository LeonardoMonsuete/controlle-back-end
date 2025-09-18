import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';
import { AccountsReceivableDto } from './accounts-receivable.dto';
import { MonthsDto } from './months.dto';

export class MonthlyCreditDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  accountReceivableId: number;

  @IsOptional()
  accountReceivable?: AccountsReceivableDto;

  @IsNumber()
  monthId: number;

  @IsOptional()
  month?: MonthsDto;

  @IsOptional()
  @IsBoolean()
  received: boolean;

  @IsOptional()
  @IsDateString()
  expectedDate?: Date;

  @IsOptional()
  @IsDateString()
  receivedDate?: Date;

  @IsOptional()
  @IsNumber()
  amountReceived?: number;

  @IsDateString()
  createdAt: Date;

  @IsOptional()
  @IsDateString()
  updatedAt: Date;

  @IsOptional()
  @IsDateString()
  deletedAt?: Date;
}
