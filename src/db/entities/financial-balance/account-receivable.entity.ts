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

  @Column({ name: 'is_fixed' })
  isFixed: boolean;

  @Column({ name: 'start_entry', type: 'date', nullable: true })
  startEntry?: Date;

  @Column({ name: 'end_entry', type: 'date', nullable: true })
  endEntry?: Date;

  @Column({ default: false })
  expired: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @OneToMany(() => MonthlyCreditEntity, (credit) => credit.accountReceivable)
  monthlyCredits: MonthlyCreditEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
