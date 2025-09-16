import { Module } from '@nestjs/common';
import { FinancialBalanceService } from './services/financial-balance.service';
import { FinancialBalanceController } from './controllers/financial-balance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AccountsPayableEntity,
  AccountsReceivableEntity,
  MonthEntity,
  MonthlyCreditEntity,
  MonthlyDebitEntity,
} from 'src/db/entities/financial-balance';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [FinancialBalanceService],
  controllers: [FinancialBalanceController],
  imports: [
    TypeOrmModule.forFeature([
      AccountsPayableEntity,
      MonthEntity,
      MonthlyDebitEntity,
      AccountsReceivableEntity,
      MonthlyCreditEntity,
    ]),
    CommonModule,
  ],
})
export class FinancialBalanceModule {}
