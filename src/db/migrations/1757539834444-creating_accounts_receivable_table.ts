import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatingAccountsReceivableTable1757539834444
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE accounts_receivable (
                                id SERIAL PRIMARY KEY,
                                description VARCHAR(255) NOT NULL,
                                is_fixed BOOLEAN DEFAULT FALSE,
                                start_entry DATE,
                                end_entry DATE,
                                expired BOOLEAN DEFAULT FALSE,
                                amount DECIMAL(12,2) NOT NULL,
                                created_at TIMESTAMP DEFAULT NOW(),
                                updated_at TIMESTAMP DEFAULT NOW(),
                                deleted_at TIMESTAMP
                            );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE IF EXISTS accounts_receivable CASCADE;`,
    );
  }
}
