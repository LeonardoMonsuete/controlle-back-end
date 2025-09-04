import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfilesTable1757006149972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE profiles (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255),
                status BOOLEAN DEFAULT TRUE,
                is_master BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE,
                deleted_at TIMESTAMP WITH TIME ZONE
            );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS profiles CASCADE;`);
  }
}
