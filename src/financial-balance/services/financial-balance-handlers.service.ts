import { Between, FindOptionsWhere, ILike, IsNull } from 'typeorm';
import {
  FindAllAccountsPayableParams,
  FindAllAccountsReceivableParams,
} from '../dtos';

export class FinancialBalanceHandlersService {
  protected handleSearchParamsPayable(
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

  protected handleSearchParamsReceivable(
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
