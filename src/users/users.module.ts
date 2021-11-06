import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { ProfilesService } from '../profiles/profiles.service';
import { ProfilesModule } from '../profiles/profiles.module';
import { Profile } from '../profiles/profiles.model';
import { Follower } from '../followers/followers.model';
import { FollowersService } from '../followers/followers.service';
import { FollowersModule } from '../followers/followers.module';
import { AuthModule } from '../auth/auth.module';
import { Auth } from '../auth/auth.model';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ProfilesService, FollowersService, AuthService],
  imports: [
    SequelizeModule.forFeature([User, Profile, Follower, Auth]),
    forwardRef(() => ProfilesModule),
    forwardRef(() => FollowersModule),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService]
})
export class UsersModule {
}
