import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/users/users.entity';
import { ProfileEntity } from './entities/users/profile.entity';
import { UserProfileEntity } from './entities/users/user-profile.entity';
import {
  AccountsPayableEntity,
  AccountsReceivableEntity,
  MonthEntity,
  MonthlyCreditEntity,
  MonthlyDebitEntity,
  YearEntity,
} from './entities/financial-balance';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [
    UserEntity,
    ProfileEntity,
    UserProfileEntity,
    YearEntity,
    MonthEntity,
    AccountsPayableEntity,
    AccountsReceivableEntity,
    MonthlyDebitEntity,
    MonthlyCreditEntity,
  ],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
});
