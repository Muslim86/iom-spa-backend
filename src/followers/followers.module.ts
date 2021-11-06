import { forwardRef, Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Follower } from './followers.model';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { Auth } from '../auth/auth.model';
import { User } from '../users/users.model';
import { Profile } from '../profiles/profiles.model';
import { ProfilesModule } from '../profiles/profiles.module';


@Module({
  providers: [FollowersService, UsersService, AuthService],
  controllers: [FollowersController],
  imports: [
    SequelizeModule.forFeature([Follower, Auth, User, Profile]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ProfilesModule),
  ],
  exports: [FollowersService]
})
export class FollowersModule {}
