import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { packageSchema } from './packages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'package', schema: packageSchema }]),
  ],
  providers: [PackagesService],
  controllers: [PackagesController],
})
export class PackagesModule {}
