import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const result = omit(user, 'password');
      return result;
    }
    return null;
  }
}
