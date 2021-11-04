import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { ProfilesService } from '../profiles/profiles.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private profileService: ProfilesService) {
  }

  async getUsers(count = 10, page = 1) {
    const max = count;
    const min = (page * count) - count;
    return {
      users: await this.userRepository.findAll({ offset: min, limit: max }),
      usersCount: await this.userRepository.count()
    };
  }

  async getUser(id) {
    return await this.userRepository.findOne({where: {id: id}})
  }

  async createManyUsers(users) {
    users.map(user => this.userRepository.create(user)).map(user => this.profileService.createProfile({ userId: user.id, roles: process.env.DEFAULT_USER_ROLE }));
    return { status: 200 };
  }

  async createUser(dto: CreateUserDto) {
    const newUser = await this.userRepository.create(dto);
    await this.profileService.createProfile({ userId: newUser.id, roles: process.env.DEFAULT_USER_ROLE });
    return newUser;
  }
}
