import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './auth.model';
import { User } from '../users/users.model';
import { ProfilesModule } from '../profiles/profiles.module';
import { FollowersModule } from '../followers/followers.module';
import { Follower } from '../followers/followers.model';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService
  ],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => ProfilesModule),
    forwardRef(() => FollowersModule),
    SequelizeModule.forFeature([Auth, User, Follower])
  ],
  exports: [
    AuthService,
  ]
})
export class AuthModule {
}
