import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './auth.model';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserDto } from '../users/dto/user.dto';
import { ProfilesService } from '../profiles/profiles.service';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {

  constructor(@InjectModel(Auth) private authRepository: typeof Auth,
              @InjectModel(User) private userRepository: typeof User,
              private usersService: UsersService,
              private profileService: ProfilesService) {
  }

  async registration(userDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(userDto.password, 4);
    const newUser = await this.usersService.createUser({ ...userDto, password: hashPassword });
    const user = new UserDto(newUser);
    const tokens = await this.generateToken({ ...user });
    const authUser = await this.authRepository.create({
      userId: newUser.id,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });

    return {
      user: user,
      tokens: tokens
    };
  }

  async generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCES_SECRET, { expiresIn: '1m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken
    };
  }

  async getUserByAccessToken(accessToken: any) {
    const authUser = await this.authRepository.findOne({ where: { accessToken: accessToken } });
    if (!authUser) return new HttpException('cookie not found', 404);
    return await this.profileService.getProfile(authUser.userId);
  }

  async login(userDto: CreateUserDto) {
    const user = await this.userRepository.findOne({ where: { name: userDto.name } });
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (passwordEquals) {
      return {
        profile: await this.authRepository.findOne({ where: { userId: user.id } }),
        user: user
      };
    } else {
      return;
    }
  }
}
