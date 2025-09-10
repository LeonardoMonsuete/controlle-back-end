import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FinancialBalanceModule } from './financial-balance/financial-balance.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DbModule,
    AuthModule,
    FinancialBalanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
