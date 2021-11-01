import { Controller, Get, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {
  }

  @Get('/:value')
  getProfile(@Param('value') value: string) {
    console.log(value)
    return this.profileService.getProfile(value);
  }
}
