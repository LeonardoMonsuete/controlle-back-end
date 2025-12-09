import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { MonthlyCreditEntity } from './monthly-credit.entity';
import { MonthlyDebitEntity } from './monthly-debit.entity';

@Entity('months')
export class MonthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'month_number',
  })
  monthNumber: number;

  @Column({
    name: 'month_name',
  })
  monthName: string;

  @Column({
    name: 'year_id',
  })
  yearId: number;

  @Column({ default: false })
  closed: boolean;

  @OneToMany(() => MonthlyCreditEntity, (credit) => credit.month)
  credits: MonthlyCreditEntity[];

  @OneToMany(() => MonthlyDebitEntity, (debit) => debit.month)
  debits: MonthlyDebitEntity[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt?: Date;
}
