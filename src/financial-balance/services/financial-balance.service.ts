import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, IsNull, Repository } from 'typeorm';
import {
  AccountsPayableDto,
  AccountsReceivableDto,
  FindAllAccountsPayableParams,
  FindAllAccountsReceivableParams,
  MonthlyDebitDto,
  GroupedMonthlyDebitsDto,
} from '../dtos';
import {
  AccountsPayableEntity,
  AccountsReceivableEntity,
  MonthlyCreditEntity,
  MonthlyDebitEntity,
} from 'src/db/entities/financial-balance';
import { EntityMapperHelper } from 'src/common/helpers';
import { FinancialBalanceHandlersService } from './financial-balance-handlers.service';
import { I18nService } from 'nestjs-i18n';

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
    private readonly i18n: I18nService,
  ) {
    super();
  }
  async findAllAccountsPayable(
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

  async findAllAccountsReceivable(
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

  async findMonthlyAccountsToPay(): Promise<GroupedMonthlyDebitsDto[] | []> {
    const accountsPayable = await this.monthlyDebitRepository.find({
      where: {
        deletedAt: IsNull(),
      },
      relations: ['month'],
    });

    if (accountsPayable.length === 0) return [];
    // console.log('accountsPayable', accountsPayable);
    const groupedByMonth = accountsPayable.reduce(
      (acc, debit) => {
        console.log('acc', acc);
        console.log('debit', debit);
        const monthId = debit.monthId;
        if (!acc[monthId]) {
          acc[monthId] = {
            monthId: monthId,
            monthName: this.i18n.translate(
              `common.months.${debit.month.monthName.toLowerCase()}`,
              { lang: 'pt' },
            ),
            accounts: [],
          };
        }
        const mappedDebit = this.entityMapperHelper.mapEntityToDto(
          debit,
          MonthlyDebitDto,
        );
        if (mappedDebit) {
          acc[monthId].accounts.push(mappedDebit);
        }
        return acc;
      },
      {} as Record<number, GroupedMonthlyDebitsDto>,
    );

    return Object.values(groupedByMonth);
  }
}
