import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Profile' })
export class ProfileEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ type: 'boolean', name: 'is_master' })
  isMaster: boolean;

  @Column({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', name: 'deleted_at' })
  deletedAt: Date;
}
