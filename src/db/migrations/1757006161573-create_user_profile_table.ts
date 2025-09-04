import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserProfileTable1757006161573 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE user_profile (
                user_id INTEGER,
                profile_id INTEGER,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP WITH TIME ZONE,
                PRIMARY KEY (user_id, profile_id),
                CONSTRAINT fk_user_profile_user FOREIGN KEY (user_id) REFERENCES users (id),
                CONSTRAINT fk_user_profile_profile FOREIGN KEY (profile_id) REFERENCES profiles (id)
            );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user_profile`);
  }
}
