import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { typeSchema } from './types.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'type', schema: typeSchema }])],
  providers: [TypesService],
  controllers: [TypesController],
})
export class TypesModule {}
