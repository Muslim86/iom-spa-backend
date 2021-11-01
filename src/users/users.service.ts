import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {
  }

  async getUsers(count = 10, page = 1) {
    const max = count;
    const min = (page * count) - count;
    return {
      users: await this.userRepository.findAll({ offset: min, limit: max }),
      usersCount: await this.userRepository.count(),
    };
  }

  async createUser(user) {
    await this.userRepository.create(user);
    return { status: 200 };
  }
}
