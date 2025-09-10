import { Test, TestingModule } from '@nestjs/testing';
import { FinancialBalanceController } from './financial-balance.controller';

describe('FinancialBalanceController', () => {
  let controller: FinancialBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialBalanceController],
    }).compile();

    controller = module.get<FinancialBalanceController>(FinancialBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
