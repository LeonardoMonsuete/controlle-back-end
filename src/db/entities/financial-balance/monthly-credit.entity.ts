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
import { AccountsReceivableEntity } from './account-receivable.entity';
import { MonthEntity } from './months.entity';

@Entity('monthly_credit')
export class MonthlyCreditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => AccountsReceivableEntity,
    (account) => account.monthlyCredits,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'account_receivable_id' })
  accountReceivable: AccountsReceivableEntity;

  @Column({ name: 'account_receivable_id' })
  accountReceivableId: number;

  @ManyToOne(() => MonthEntity, (month) => month.credits)
  @JoinColumn({ name: 'month_id' })
  month: MonthEntity;

  @Column({ name: 'month_id' })
  monthId: number;

  @Column({ default: false })
  received: boolean;

  @Column({ type: 'date', nullable: true })
  expectedDate?: Date;

  @Column({ type: 'date', nullable: true })
  receivedDate?: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  amountReceived?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
