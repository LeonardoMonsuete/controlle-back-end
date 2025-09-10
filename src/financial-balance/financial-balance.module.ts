import { Module } from '@nestjs/common';
import { FinancialBalanceService } from './services/financial-balance.service';
import { FinancialBalanceController } from './controllers/financial-balance.controller';

@Module({
  providers: [FinancialBalanceService],
  controllers: [FinancialBalanceController],
})
export class FinancialBalanceModule {}
