import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { GoogleProfile } from 'src/auth/types';

export interface User {
  _id: string;
  username?: string;
  password?: string;

  googleId?: string;
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      _id: '1',
      username: 'john',
      password: 'changeme',
    },
    {
      _id: '2',
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor(
    @InjectModel('user') private readonly UserModel: Model<Document & User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async oauth(profile: GoogleProfile): Promise<User> {
    const found = await this.UserModel.findOne({
      googleId: profile.id,
    }).exec();
    let user = found;

    if (!found) {
      const created = await this.UserModel.create({ googleId: profile.id });
      user = created;
    }

    return {
      _id: user._id.toString(),
      googleId: user.googleId,
      username: user.username,
    };
  }
}
