import { Controller, Get, UseGuards } from '@nestjs/common';
import { FinancialBalanceService } from '../services/financial-balance.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('financial-balance')
export class FinancialBalanceController {
  constructor(
    private readonly financialBalanceService: FinancialBalanceService,
  ) {}

  @Get()
  list() {
    return 'ok';
  }
}
