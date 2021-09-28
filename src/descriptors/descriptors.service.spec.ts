import { Test, TestingModule } from '@nestjs/testing';
import { DescriptorsService } from './descriptors.service';

describe('DescriptorsService', () => {
  let service: DescriptorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescriptorsService],
    }).compile();

    service = module.get<DescriptorsService>(DescriptorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
