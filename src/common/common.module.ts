import { Module } from '@nestjs/common';
import { EntityMapperHelper } from './helpers';

@Module({
  providers: [EntityMapperHelper],
  exports: [EntityMapperHelper],
})
export class CommonModule {}
