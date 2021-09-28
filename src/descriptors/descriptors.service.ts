import { Injectable } from '@nestjs/common';
import { TypesService } from 'src/types/types.service';
import { Orderable } from './types';

@Injectable()
export class DescriptorsService {
  constructor(private readonly typesService: TypesService) {}

  async rearrange(items: Array<Orderable>, authorId: string) {
    await this.typesService.rearrange(items, authorId);
  }
}
