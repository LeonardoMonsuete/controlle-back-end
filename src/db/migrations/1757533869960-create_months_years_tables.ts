import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMonthsYearsTables1757533869960
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE years (
            id SERIAL PRIMARY KEY,
            year_number INT NOT NULL,
            closed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            deleted_at TIMESTAMP
        );

        CREATE TABLE months (
            id SERIAL PRIMARY KEY,
            month_number INT NOT NULL CHECK (month_number BETWEEN 1 AND 12),
            month_name VARCHAR(20) NOT NULL,
            year_id INT NOT NULL REFERENCES years(id) ON DELETE CASCADE,
            closed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            deleted_at TIMESTAMP
        );

        -- ============================
        -- Inserting Years (2025 - 2035)
        -- ============================
        INSERT INTO years (year_number, closed)
        VALUES
        (2025, FALSE),
        (2026, FALSE),
        (2027, FALSE),
        (2028, FALSE),
        (2029, FALSE),
        (2030, FALSE),
        (2031, FALSE),
        (2032, FALSE),
        (2033, FALSE),
        (2034, FALSE),
        (2035, FALSE);

        -- ============================
        -- Inserting Months (1-12 for each year)
        -- ============================
        DO $$
        DECLARE
            y RECORD;
            months_list TEXT[] := ARRAY[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            i INT;
        BEGIN
            FOR y IN SELECT id, year_number FROM years WHERE year_number BETWEEN 2025 AND 2035 LOOP
                FOR i IN 1..12 LOOP
                    INSERT INTO months (month_number, month_name, year_id, closed)
                    VALUES (i, months_list[i], y.id, FALSE);
                END LOOP;
            END LOOP;
        END $$;
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS months CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS years CASCADE;`);
  }
}
