import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Package, PackageDto } from './types';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel('package')
    private readonly PackageModel: Model<Document & Package>,
  ) {}

  async getAll(authorId: string) {
    return this.PackageModel.find({
      authorId,
    }).exec();
  }

  async update(packageDto: PackageDto, authorId: string) {
    if (packageDto._id) {
      await this.PackageModel.updateOne(
        { _id: packageDto._id, authorId },
        { $set: { name: packageDto.name } },
      ).exec();
    } else {
      const created = await this.PackageModel.create({
        name: packageDto.name,
        authorId,
      });
      return created._id;
    }
  }

  async delete(_id: string, authorId: string) {
    await this.PackageModel.deleteOne({
      _id,
      authorId,
    });
  }
}
