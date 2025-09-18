import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FinancialBalanceService } from '../services/financial-balance.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  FindAllAccountsPayableParams,
  FindAllAccountsReceivableParams,
} from '../dtos';

@UseGuards(AuthGuard)
@Controller('financial-balance')
export class FinancialBalanceController {
  constructor(
    private readonly financialBalanceService: FinancialBalanceService,
  ) {}

  @Get('/accounts-payable')
  async listAccountPayments(@Query() params: FindAllAccountsPayableParams) {
    return await this.financialBalanceService.findAllAccoountsPayable(params);
  }

  @Get('/accounts-receivable')
  async listAccountReceivable(
    @Query() params: FindAllAccountsReceivableParams,
  ) {
    return await this.financialBalanceService.findAllAccoountsReceivable(
      params,
    );
  }
}
