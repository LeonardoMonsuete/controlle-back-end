import { Test, TestingModule } from '@nestjs/testing';
import { FinancialBalanceService } from './financial-balance.service';

describe('FinancialBalanceService', () => {
  let service: FinancialBalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialBalanceService],
    }).compile();

    service = module.get<FinancialBalanceService>(FinancialBalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
