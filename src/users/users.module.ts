import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/users/users.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity]), CommonModule],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
