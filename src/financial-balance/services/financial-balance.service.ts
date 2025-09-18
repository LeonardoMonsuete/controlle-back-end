import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, ILike, IsNull, Repository } from 'typeorm';
import {
  AccountsPayableDto,
  AccountsReceivableDto,
  FindAllAccountsPayableParams,
  FindAllAccountsReceivableParams,
} from '../dtos';
import {
  AccountsPayableEntity,
  AccountsReceivableEntity,
  MonthlyCreditEntity,
  MonthlyDebitEntity,
} from 'src/db/entities/financial-balance';
import { EntityMapperHelper } from 'src/common/helpers';

@Injectable()
export class FinancialBalanceService {
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
  ) {}
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
  ): Promise<AccountsPayableDto[] | []> {
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

  private handleSearchParamsPayable(
    params: FindAllAccountsPayableParams,
  ): FindOptionsWhere<any> {
    const searchParams: FindOptionsWhere<any> = {
      deletedAt: IsNull(),
    };

    if (params.description) {
      searchParams.description = ILike(`%${params.description}%`);
    }

    if (params.monthName) {
      searchParams.monthName = ILike(`%${params.monthName}%`);
    }

    if (params.monthNumber) {
      searchParams.monthNumber = params.monthNumber;
    }

    if (params.id) {
      searchParams.id = params.id;
    }

    if (params.isExpired) {
      searchParams.isExpired = params.isExpired;
    }

    if (params.isFixed) {
      searchParams.isFixed = params.isFixed;
    }

    if (params.late) {
      searchParams.late = params.late;
    }

    if (params.paymentMade) {
      searchParams.paymentMade = params.paymentMade;
    }

    if (params.paymentDate) {
      searchParams.paymentDate = new Date(params.paymentDate);
    }

    if (params.beginPaymentStartDate && params.endPaymentStartDate) {
      searchParams.paymentDate = Between(
        params.beginPaymentStartDate,
        params.endPaymentStartDate,
      );
    }

    if (params.startAmountScope && params.endAmountScope) {
      searchParams.installmentAmount = Between(
        params.startAmountScope,
        params.endAmountScope,
      );
    }

    return searchParams;
  }

  private handleSearchParamsReceivable(
    params: FindAllAccountsReceivableParams,
  ): FindOptionsWhere<any> {
    const searchParams: FindOptionsWhere<any> = {
      deletedAt: IsNull(),
    };

    if (params.description) {
      searchParams.description = ILike(`%${params.description}%`);
    }

    if (params.monthName) {
      searchParams.monthName = ILike(`%${params.monthName}%`);
    }

    if (params.monthNumber) {
      searchParams.monthNumber = params.monthNumber;
    }

    if (params.id) {
      searchParams.id = params.id;
    }

    if (params.isExpired) {
      searchParams.isExpired = params.isExpired;
    }

    if (params.isFixed) {
      searchParams.isFixed = params.isFixed;
    }

    if (params.late) {
      searchParams.late = params.late;
    }

    return searchParams;
  }
}
