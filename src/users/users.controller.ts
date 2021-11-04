import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @Get()
  getUsers(@Req() req) {
    console.log(req.query);
    return this.userService.getUsers(req.query.count, req.query.page);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/many')
  createManyUser(@Req() req) {
    return this.userService.createManyUsers(req.body.users);
  }
}
