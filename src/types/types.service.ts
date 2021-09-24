import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { TypeDto, Type } from './types';

@Injectable()
export class TypesService {
  constructor(
    @InjectModel('type') private readonly TypeModel: Model<Document & Type>,
    @InjectModel('external-type')
    private readonly ExternalTypeModel: Model<Document & Type>,
  ) {}
  async update(typeDto: TypeDto, authorId: string) {
    if (typeDto._id) {
      await this.TypeModel.updateOne(
        { _id: typeDto._id, authorId },
        { $set: { name: typeDto.name, body: typeDto.body } },
      ).exec();
    } else {
      const created = await this.TypeModel.create({
        name: typeDto.name,
        body: typeDto.body,
        authorId,
      });
      return created._id;
    }
  }

  async getAll(authorId: string) {
    return this.TypeModel.find({ authorId }).exec();
  }

  async delete(_id: string, authorId: string) {
    await this.TypeModel.deleteOne({
      _id,
      authorId,
    });
  }

  async publish(typeDto: TypeDto, authorId: string) {
    const created = await this.ExternalTypeModel.create({
      name: typeDto.name,
      body: typeDto.body,
      authorId,
    });
    return created._id;
  }

  async query(query: string) {
    return this.ExternalTypeModel.find({
      $or: [
        { $text: { $search: query } },
        { name: new RegExp(`.*${query}.*`, 'i') },
      ],
    })
      .limit(20)
      .exec();
  }

  async getExternal(_id: string) {
    return this.ExternalTypeModel.findById(_id).exec();
  }
}
