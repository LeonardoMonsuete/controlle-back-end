import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1757005588380 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          status BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMPTZ,
          deleted_at TIMESTAMPTZ,
          last_login TIMESTAMPTZ
      );
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_USERNAME_ACTIVE" ON "users" ("username")
      WHERE deleted_at IS NULL;
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_EMAIL_ACTIVE" ON "users" ("email")
      WHERE deleted_at IS NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users CASCADE;`);
  }
}
