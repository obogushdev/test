import { Test, TestingModule } from '@nestjs/testing';
import { CarbonCertificatesController } from './carbon-certificates.controller';
import { CarbonCertificatesService } from './carbon-certificates.service';

describe('CarbonCertificatesController', () => {
  let controller: CarbonCertificatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarbonCertificatesController],
      providers: [CarbonCertificatesService],
    }).compile();

    controller = module.get<CarbonCertificatesController>(CarbonCertificatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
