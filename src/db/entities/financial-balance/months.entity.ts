import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { YearEntity } from './years.entity';
import { MonthlyCreditEntity } from './monthly-credit.entity';
import { MonthlyDebitEntity } from './monthly-debit.entity';

@Entity('months')
export class MonthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monthNumber: number;

  @ManyToOne(() => YearEntity, (year) => year.months)
  year: YearEntity;

  @Column({ default: false })
  closed: boolean;

  @OneToMany(() => MonthlyCreditEntity, (credit) => credit.month)
  credits: MonthlyCreditEntity[];

  @OneToMany(() => MonthlyDebitEntity, (debit) => debit.month)
  debits: MonthlyDebitEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
