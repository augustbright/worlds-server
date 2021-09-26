import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Profile, ProfileDto } from './types';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('profile')
    private readonly ProfileModel: Model<Document & Profile>,
  ) {}

  async getProfile(userId: string) {
    return this.ProfileModel.findById(userId).exec();
  }

  async updateProfile(profileDto: ProfileDto, userId: string) {
    await this.ProfileModel.updateOne(
      { _id: userId },
      { $set: { name: profileDto.name } },
      {
        upsert: true,
      },
    ).exec();
  }
}
