import { Module } from '@nestjs/common';
import { FinancialBalanceService } from './services/financial-balance.service';

@Module({
  providers: [FinancialBalanceService],
})
export class FinancialBalanceModule {}
