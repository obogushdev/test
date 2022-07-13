import { Test, TestingModule } from '@nestjs/testing';
import { CarbonCertificatesService } from './carbon-certificates.service';

describe('CarbonCertificatesService', () => {
  let service: CarbonCertificatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarbonCertificatesService],
    }).compile();

    service = module.get<CarbonCertificatesService>(CarbonCertificatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
