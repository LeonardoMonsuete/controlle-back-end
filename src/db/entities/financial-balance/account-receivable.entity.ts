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

@Entity('accounts_receivable')
export class AccountsReceivableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: false })
  isFixed: boolean;

  @Column({ type: 'date', nullable: true })
  startEntry?: Date;

  @Column({ type: 'date', nullable: true })
  endEntry?: Date;

  @Column({ default: false })
  expired: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @OneToMany(() => MonthlyCreditEntity, (credit) => credit.accountReceivable)
  monthlyCredits: MonthlyCreditEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
