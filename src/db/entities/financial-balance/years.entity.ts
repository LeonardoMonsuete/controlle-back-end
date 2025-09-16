import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { MonthEntity } from './months.entity';

@Entity('years')
export class YearEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  yearNumber: number;

  @Column({ default: false })
  closed: boolean;

  @OneToMany(() => MonthEntity, (month) => month.year)
  months: MonthEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
