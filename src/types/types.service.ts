// TODO use sessions

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Orderable } from 'src/descriptors/types';
import { definedObject } from 'src/funcs/common';
import { TypeDto, Type, GetAllQuery } from './types';

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
        {
          $set: definedObject({
            name: typeDto.name,
            body: typeDto.body,
            packageId: typeDto.packageId,
          }),
        },
      ).exec();
    } else {
      const created = await this.TypeModel.create({
        name: typeDto.name,
        body: typeDto.body,
        authorId,
        order: typeDto.order,
        packageId: typeDto.packageId,
      });
      return created._id;
    }
  }

  async rearrange(items: Array<Orderable>, authorId: string) {
    return Promise.all(
      items.map((item) =>
        this.TypeModel.updateOne(
          { _id: item._id, authorId },
          { $set: { order: item.order } },
        ).exec(),
      ),
    );
  }

  async getAll(authorId: string, query: GetAllQuery) {
    return this.TypeModel.find(
      definedObject({
        authorId,
        packageId: query.packageId,
      }),
    )
      .sort({
        order: 'asc',
      })
      .exec();
  }

  async archieve(_id: string, authorId: string) {
    await this.TypeModel.updateOne(
      {
        _id,
        authorId,
      },
      { $set: { deleted: true } },
    );
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
