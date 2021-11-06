import { forwardRef, Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profiles.model';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/users.model';
import { FollowersModule } from '../followers/followers.module';
import { Follower } from '../followers/followers.model';
import { Auth } from '../auth/auth.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, UsersService],
  imports: [
    SequelizeModule.forFeature([Profile, User, Follower, Auth]),
    forwardRef(() => UsersModule),
    forwardRef(() => FollowersModule),
    forwardRef(() => AuthModule),
  ],
  exports: [ProfilesService]
})
export class ProfilesModule {}
