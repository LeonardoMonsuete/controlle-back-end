import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;

  @Column({
    type: 'timestamp with time zone',
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date;

  @Column({
    type: 'timestamp with time zone',
    name: 'last_login',
    nullable: true,
  })
  lastLogin: Date;
}
