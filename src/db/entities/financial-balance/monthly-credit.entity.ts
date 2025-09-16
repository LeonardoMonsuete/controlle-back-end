import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
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
  )
  accountReceivable: AccountsReceivableEntity;

  @ManyToOne(() => MonthEntity, (month) => month.credits)
  month: MonthEntity;

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
