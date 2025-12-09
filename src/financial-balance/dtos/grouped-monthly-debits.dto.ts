import { IsArray, IsNumber, IsString } from 'class-validator';
import { MonthlyDebitDto } from './monthly-debit.dto';

export class GroupedMonthlyDebitsDto {
  @IsNumber()
  monthId: number;

  @IsString()
  monthName: string;

  @IsArray()
  accounts: MonthlyDebitDto[];
}
