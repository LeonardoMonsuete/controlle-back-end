import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatingMonthlyCreditTable1757539862973
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE monthly_credit (
                                id SERIAL PRIMARY KEY,
                                account_receivable_id INT NOT NULL REFERENCES accounts_receivable(id) ON DELETE CASCADE,
                                month_id INT NOT NULL REFERENCES months(id) ON DELETE CASCADE,
                                received BOOLEAN DEFAULT FALSE,
                                expected_date DATE,
                                received_date DATE,
                                amount_received DECIMAL(12,2),
                                created_at TIMESTAMP DEFAULT NOW(),
                                updated_at TIMESTAMP DEFAULT NOW(),
                                deleted_at TIMESTAMP
                            );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS monthly_credit CASCADE;`);
  }
}
