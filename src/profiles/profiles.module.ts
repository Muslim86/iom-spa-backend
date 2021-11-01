import { forwardRef, Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profiles.model';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/users.model';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, UsersService],
  imports: [
    SequelizeModule.forFeature([Profile, User]),
    forwardRef(() => UsersModule),
  ],
  exports: [ProfilesService]
})
export class ProfilesModule {}
