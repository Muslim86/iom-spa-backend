import { Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Request } from 'express';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @Get()
  getUsers(@Req() req) {
    console.log(req.query)
    return this.userService.getUsers(req.query.count, req.query.page);
  }

  @Post()
  createUser(@Req() req) {
    return this.userService.createUser(req.body);
  }
}
