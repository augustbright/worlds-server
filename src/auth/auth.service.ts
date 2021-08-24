import { Injectable } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.stategy';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const result = omit(user, 'password');
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
