import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatingAccountsPayableTable1757539875275
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE accounts_payable (
                                id SERIAL PRIMARY KEY,
                                description VARCHAR(255) NOT NULL,
                                is_fixed BOOLEAN DEFAULT FALSE,
                                start_payment DATE,
                                end_payment DATE,
                                expired BOOLEAN DEFAULT FALSE,
                                installment_amount DECIMAL(12,2),
                                total_amount DECIMAL(12,2),
                                installments_count INT,
                                has_interest BOOLEAN DEFAULT FALSE,
                                created_at TIMESTAMP DEFAULT NOW(),
                                updated_at TIMESTAMP DEFAULT NOW(),
                                deleted_at TIMESTAMP
                            );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS accounts_payable CASCADE;`);
  }
}
