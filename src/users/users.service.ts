import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { ProfilesService } from '../profiles/profiles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FollowersService } from '../followers/followers.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private profileService: ProfilesService,
              @Inject(forwardRef(() => FollowersService))
              private followerService: FollowersService) {
  }

  async getUsers(count = 10, page = 1, userId) {
    const max = count;
    const min = (page * count) - count;
    const users = await this.userRepository.findAll({ offset: min, limit: max });
    const subscribes = await this.followerService.getSubscribes(userId);
    const userSubscribes = users.map(user => {
      return new UserDto({
        id: user.id,
        password: user.password,
        status: user.status,
        name: user.name,
        gender: user.gender,
        photo: user.photo,
        follower: !!subscribes.find(sub => user.id === sub.subscribeId)
      });
    });
    return {
      users: userSubscribes,
      usersCount: await this.userRepository.count()
    };
  }

  async getUser(id) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async createManyUsers(users) {
    users
      .map(user => this.userRepository.create(user))
      .map(user => this.profileService.createProfile({ userId: user.id, roles: process.env.DEFAULT_USER_ROLE }));
    return { status: 200 };
  }

  async createUser(dto: CreateUserDto) {
    const newUser = await this.userRepository.create(dto);
    await this.profileService.createProfile({ userId: newUser.id, roles: process.env.DEFAULT_USER_ROLE });
    return newUser;
  }

  async updateStatus(id, status) {
    const user = await this.getUser(id);
    user.status = status;
    await user.save();
    console.log(user, status)
    return user
  }
}
