import { Test, TestingModule } from '@nestjs/testing';
import { DescriptorsController } from './descriptors.controller';

describe('DescriptorsController', () => {
  let controller: DescriptorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescriptorsController],
    }).compile();

    controller = module.get<DescriptorsController>(DescriptorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
