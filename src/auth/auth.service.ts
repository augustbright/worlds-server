import { Injectable } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.stategy';
import { GoogleProfile } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const result = omit(user, 'password');
      return result;
    }
    return null;
  }

  async googleOAuth(profile: GoogleProfile) {
    const user = await this.usersService.oauth(profile);
    if (user) {
      return omit(user, 'password');
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      sub: user._id,
      username: user.username,
      googleId: user.googleId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
