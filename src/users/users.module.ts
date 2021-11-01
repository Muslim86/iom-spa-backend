import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { ProfilesService } from '../profiles/profiles.service';
import { ProfilesModule } from '../profiles/profiles.module';
import { Profile } from '../profiles/profiles.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ProfilesService],
  imports: [
    SequelizeModule.forFeature([User, Profile]),
    forwardRef(() => ProfilesModule),
  ],
  exports: [UsersService]
})
export class UsersModule {
}
