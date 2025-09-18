import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { AccountsPayableEntity } from './account-payable.entity';
import { MonthEntity } from './months.entity';

@Entity('monthly_debit')
export class MonthlyDebitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountsPayableEntity, (account) => account.monthlyDebits, {
    eager: true,
  })
  @JoinColumn({ name: 'account_payable_id' })
  accountPayable: AccountsPayableEntity;

  @Column({ name: 'account_payable_id' })
  accountPayableId: number;

  @ManyToOne(() => MonthEntity, (month) => month.debits)
  @JoinColumn({ name: 'month_id' })
  month: MonthEntity;

  @Column({ name: 'month_id' })
  monthId: number;

  @Column({ name: 'payment_made', default: false })
  paymentMade: boolean;

  @Column({ name: 'payment_date', type: 'date', nullable: true })
  paymentDate?: Date;

  @Column({ default: false })
  late: boolean;

  @Column({
    name: 'amount_paid',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  amountPaid?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
