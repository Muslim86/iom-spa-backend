import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profiles.model';
import { UsersService } from '../users/users.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
              @Inject(forwardRef(() => UsersService))
              private userService: UsersService) {
  }

  async getProfile(userId) {
    return {
      profile: await this.profileRepository.findOne({ where: { userId: userId } }),
      user: await this.userService.getUser(userId),
    };
  }

  async createProfile(dto: CreateProfileDto) {
    await this.profileRepository.create(dto);
    return { status: 200 };
  }
}
