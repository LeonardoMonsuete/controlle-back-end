import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, IsNull, Repository } from 'typeorm';
import {
  AccountsPayableDto,
  AccountsReceivableDto,
  FindAllAccountsPayableParams,
  FindAllAccountsReceivableParams,
  MonthlyDebitDto,
} from '../dtos';
import {
  AccountsPayableEntity,
  AccountsReceivableEntity,
  MonthlyCreditEntity,
  MonthlyDebitEntity,
} from 'src/db/entities/financial-balance';
import { EntityMapperHelper } from 'src/common/helpers';
import { FinancialBalanceHandlersService } from './financial-balance-handlers.service';

@Injectable()
export class FinancialBalanceService extends FinancialBalanceHandlersService {
  constructor(
    @InjectRepository(AccountsPayableEntity)
    private readonly accountsPayableRepository: Repository<AccountsPayableEntity>,
    @InjectRepository(MonthlyDebitEntity)
    private readonly monthlyDebitRepository: Repository<MonthlyDebitEntity>,
    @InjectRepository(AccountsReceivableEntity)
    private readonly accountsReceivableRepository: Repository<AccountsReceivableEntity>,
    @InjectRepository(MonthlyCreditEntity)
    private readonly monthlyCreditRepository: Repository<MonthlyCreditEntity>,
    private readonly entityMapperHelper: EntityMapperHelper,
  ) {
    super();
  }
  async findAllAccoountsPayable(
    params: FindAllAccountsPayableParams,
  ): Promise<AccountsPayableDto[] | []> {
    const searchParams: FindOptionsWhere<any> =
      this.handleSearchParamsPayable(params);
    const accountsPayable = await this.accountsPayableRepository.find({
      where: searchParams,
    });

    const returnData: AccountsPayableDto[] = [];
    if (accountsPayable.length == 0) return returnData;
    const mapedAccountsPayable = accountsPayable.map((accountPayableEntity) => {
      return this.entityMapperHelper.mapEntityToDto(
        accountPayableEntity,
        AccountsPayableDto,
      );
    });
    mapedAccountsPayable.map((mapedAccountsPayable) => {
      return mapedAccountsPayable
        ? returnData.push(mapedAccountsPayable)
        : null;
    });
    return returnData;
  }

  async findAllAccoountsReceivable(
    params: FindAllAccountsReceivableParams,
  ): Promise<AccountsReceivableDto[] | []> {
    const searchParams: FindOptionsWhere<any> =
      this.handleSearchParamsReceivable(params);
    const accountsReceivable = await this.accountsReceivableRepository.find({
      where: searchParams,
    });

    const returnData: AccountsReceivableDto[] = [];
    if (accountsReceivable.length == 0) return returnData;
    const mapedAccountsReceivable = accountsReceivable.map(
      (accountReceivableEntity) => {
        return this.entityMapperHelper.mapEntityToDto(
          accountReceivableEntity,
          AccountsReceivableDto,
        );
      },
    );
    mapedAccountsReceivable.map((mapedAccountsReceivable) => {
      return mapedAccountsReceivable
        ? returnData.push(mapedAccountsReceivable)
        : null;
    });
    return returnData;
  }

  async findMonthlyAccountsToPay(): Promise<MonthlyDebitDto[] | []> {
    const accountsPayable = await this.monthlyDebitRepository.find({
      where: {
        deletedAt: IsNull(),
      },
    });

    const returnData: MonthlyDebitDto[] = [];
    if (accountsPayable.length == 0) return returnData;
    const mapedMonthlyAccountsPayable = accountsPayable.map(
      (accountPayableEntity) => {
        return this.entityMapperHelper.mapEntityToDto(
          accountPayableEntity,
          MonthlyDebitDto,
        );
      },
    );
    mapedMonthlyAccountsPayable.map((mapedMonthlyAccountsPayable) => {
      return mapedMonthlyAccountsPayable
        ? returnData.push(mapedMonthlyAccountsPayable)
        : null;
    });
    return returnData;
  }
}
