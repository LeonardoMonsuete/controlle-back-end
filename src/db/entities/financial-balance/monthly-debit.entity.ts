import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { AccountsPayableEntity } from './account-payable.entity';
import { MonthEntity } from './months.entity';

@Entity('monthly_debit')
export class MonthlyDebitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountsPayableEntity, (account) => account.monthlyDebits)
  accountPayable: AccountsPayableEntity;

  @ManyToOne(() => MonthEntity, (month) => month.debits)
  month: MonthEntity;

  @Column({ default: false })
  paymentMade: boolean;

  @Column({ type: 'date', nullable: true })
  paymentDate?: Date;

  @Column({ default: false })
  late: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  amountPaid?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
