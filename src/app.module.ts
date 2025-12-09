import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FinancialBalanceModule } from './financial-balance/financial-balance.module';
import { I18nModule, I18nJsonLoader } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DbModule,
    AuthModule,
    FinancialBalanceModule,
    I18nModule.forRoot({
      fallbackLanguage: 'pt',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: path.join(process.cwd(), 'src/i18n'),
        watch: true,
      },
      typesOutputPath: path.join(__dirname, '../src/i18n.generated.ts'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
