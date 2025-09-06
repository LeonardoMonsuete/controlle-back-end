import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'userprofile' })
export class UserProfileEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', name: 'user_id' })
  userId: string;

  @Column({ type: 'varchar', name: 'profile_id' })
  profileId: string;

  @Column({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', name: 'deleted_at' })
  deletedAt: Date;
}
