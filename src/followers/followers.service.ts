import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Follower } from './followers.model';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';

@Injectable()
export class FollowersService {
  constructor(@InjectModel(Follower) private followersRepository: typeof Follower) {
  }

  async deleteSubscribes(dto: CreateSubscribeDto) {
    return await this.followersRepository.destroy({where: {userId: dto.userId, subscribeId: dto.subscribeId}})
  }

  async getSubscribes(userId) {
    return await this.followersRepository.findAll({where: {userId: userId}})
  }

  async createSubscribe(dto: CreateSubscribeDto) {
    return await this.followersRepository.create(dto)
  }
}
