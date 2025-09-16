export interface FindAllAccountsReceivableParams {
  id: number;
  monthName: string;
  monthNumber: number;
  description: string;
  receivableMade: boolean;
  late: boolean;
  receivableDate: Date;
  startReceivableDate: Date;
  endReceivableDate: Date;
  isFixed: boolean;
  isExpired: boolean;
}
