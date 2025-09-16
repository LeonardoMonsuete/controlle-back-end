import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { MonthlyDebitEntity } from './monthly-debit.entity';

@Entity('accounts_payable')
export class AccountsPayableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ name: 'is_fixed' })
  isFixed: boolean;

  @Column({
    name: 'start_payment',
    type: 'timestamp with time zone',
    nullable: true,
  })
  startPayment?: Date;

  @Column({
    name: 'end_payment',
    type: 'timestamp with time zone',
    nullable: true,
  })
  endPayment?: Date;

  @Column()
  expired: boolean;

  @Column({
    name: 'installment_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  installmentAmount?: number;

  @Column({
    name: 'total_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  totalAmount?: number;

  @Column({ name: 'installments_count', nullable: true })
  installmentsCount?: number;

  @Column({ name: 'has_interest' })
  hasInterest: boolean;

  @OneToMany(() => MonthlyDebitEntity, (debit) => debit?.accountPayable)
  monthlyDebits: MonthlyDebitEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
