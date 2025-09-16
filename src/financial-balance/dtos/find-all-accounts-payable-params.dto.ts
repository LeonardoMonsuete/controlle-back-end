export interface FindAllAccountsPayableParams {
  id: number;
  monthName: string;
  monthNumber: number;
  description: string;
  paymentMade: boolean;
  late: boolean;
  paymentDate: Date;
  beginPaymentStartDate: Date;
  endPaymentStartDate: Date;
  startAmountScope: number;
  endAmountScope: number;
  isFixed: boolean;
  isExpired: boolean;
  installmentsCount: number;
}
