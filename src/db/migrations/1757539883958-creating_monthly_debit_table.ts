import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatingMonthlyDebitTable1757539883958
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE monthly_debit (
                                id SERIAL PRIMARY KEY,
                                account_payable_id INT NOT NULL REFERENCES accounts_payable(id) ON DELETE CASCADE,
                                month_id INT NOT NULL REFERENCES months(id) ON DELETE CASCADE,
                                payment_made BOOLEAN DEFAULT FALSE,
                                payment_date DATE,
                                late BOOLEAN DEFAULT FALSE,
                                amount_paid DECIMAL(12,2),
                                created_at TIMESTAMP DEFAULT NOW(),
                                updated_at TIMESTAMP DEFAULT NOW(),
                                deleted_at TIMESTAMP
                            );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS monthly_debit CASCADE;`);
  }
}
