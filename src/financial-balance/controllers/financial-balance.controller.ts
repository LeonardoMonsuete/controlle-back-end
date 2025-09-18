import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FinancialBalanceService } from '../services/financial-balance.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  AccountsPayableDto,
  AccountsReceivableDto,
  FindAllAccountsPayableParams,
  FindAllAccountsReceivableParams,
  MonthlyDebitDto,
} from '../dtos';

@UseGuards(AuthGuard)
@Controller('financial-balance')
export class FinancialBalanceController {
  constructor(
    private readonly financialBalanceService: FinancialBalanceService,
  ) {}

  @Get('/accounts-payable')
  async listAccountPayments(
    @Query() params: FindAllAccountsPayableParams,
  ): Promise<AccountsPayableDto[] | []> {
    return await this.financialBalanceService.findAllAccoountsPayable(params);
  }

  @Get('/accounts-receivable')
  async listAccountReceivable(
    @Query() params: FindAllAccountsReceivableParams,
  ): Promise<AccountsReceivableDto[] | []> {
    return await this.financialBalanceService.findAllAccoountsReceivable(
      params,
    );
  }

  @Get('/monthly-accounts/payables')
  async listMonthlyAccountsToPay(): Promise<MonthlyDebitDto[] | []> {
    return await this.financialBalanceService.findMonthlyAccountsToPay();
  }
}
