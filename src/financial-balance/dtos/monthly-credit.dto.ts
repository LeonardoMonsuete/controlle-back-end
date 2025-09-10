import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class MonthlyCreditDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  accountReceivableId: number;

  @IsNumber()
  monthId: number;

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
