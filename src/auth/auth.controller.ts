import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/users.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @Post('/reg')
  async registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const data = this.authService.registration(userDto);
    res.cookie('accessToken', (await data).tokens.accessToken, { maxAge: 60 * 60 * 60 * 1000, httpOnly: true });
    return data;
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @Post('/login')
  async login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    if (!userDto.name) return new HttpException('Нет имени', 400);
    if (!userDto.password) return new HttpException('Нет пароля', 400);
    const data = await this.authService.login(userDto);
    if (typeof data === typeof HttpException) return;
    if (!(data instanceof HttpException) && data.profile) res.cookie('accessToken', (data).profile.accessToken, {
      maxAge: 60 * 60 * 60 * 1000,
      httpOnly: true
    });
    return data;
  }

  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/me')
  async getUser(@Req() request: Request) {
    const { accessToken } = request.cookies;
    if (!accessToken) {
      throw new HttpException('cookie not found', 404);
    }
    return await this.authService.getUserByAccessToken(accessToken);
  }

  @ApiOperation({ summary: 'Логаут пользователя' })
  @Get('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    return HttpStatus.OK;
  }
}
