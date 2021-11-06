import { Body, Controller, Get, HttpException, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService) {
  }

  @ApiOperation({ summary: 'get user' })
  @Get()
  async getUsers(@Req() req, @Req() request: Request) {
    const { accessToken } = request.cookies;
    const user = await this.authService.getUserByAccessToken(accessToken);
    let userId = null;
    if (!(user instanceof HttpException)) {
      userId = user.user.id;
    } else {
      return user
    }
    return this.userService.getUsers(req.query.count, req.query.page, userId);
  }

  @ApiOperation({ summary: 'create user' })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'create many users' })
  @Post('/many')
  createManyUser(@Req() req) {
    return this.userService.createManyUsers(req.body.users);
  }
}
