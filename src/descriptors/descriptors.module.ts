import { Module } from '@nestjs/common';
import { TypesModule } from 'src/types/types.module';
import { DescriptorsController } from './descriptors.controller';
import { DescriptorsService } from './descriptors.service';

@Module({
  controllers: [DescriptorsController],
  providers: [DescriptorsService],
  imports: [TypesModule],
})
export class DescriptorsModule {}
