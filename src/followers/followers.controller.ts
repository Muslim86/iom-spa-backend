import { Body, Controller, Delete, Get, HttpException, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { FollowersService } from './followers.service';
import { AuthService } from '../auth/auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('followers')
@Controller('followers')
export class FollowersController {
  constructor(private followersService: FollowersService,
              private authService: AuthService) {
  }

  @ApiOperation({summary: 'get user subscribes'})
  @Get()
  async getSubscribe(@Req() request: Request) {
    const { accessToken } = request.cookies;
    const user = await this.authService.getUserByAccessToken(accessToken);
    let userId = null;
    if (!(user instanceof HttpException)) {
      userId = user.user.id;
    } else {
      return user
    }
    return await this.followersService.getSubscribes(userId);
  }

  @ApiOperation({summary: 'create user subscribe'})
  @Post()
  async createSubscribe(@Body() body, @Req() request: Request) {
    const { accessToken } = request.cookies;
    const user = await this.authService.getUserByAccessToken(accessToken)
    let userId = null;
    if (!(user instanceof HttpException)) {
      userId = user.user.id;
    } else {
      return user
    }
    return await this.followersService.createSubscribe({userId: userId, subscribeId: body.id})
  }

  @ApiOperation({summary: 'delete user subscribes'})
  @Delete()
  async deleteSubscribe(@Body() body, @Req() request: Request) {
    const { accessToken } = request.cookies;
    const user = await this.authService.getUserByAccessToken(accessToken)
    let userId = null;
    if (!(user instanceof HttpException)) {
      userId = user.user.id;
    } else {
      return user
    }
    return await this.followersService.deleteSubscribes({userId: userId, subscribeId: body.id})
  }

}
