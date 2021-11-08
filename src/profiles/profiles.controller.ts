import { Controller, Get, Param, Put } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {
  }

  @ApiOperation({ summary: 'get user profile' })
  @Get('/:value')
  getProfile(@Param('value') value: string) {
    console.log(value);
    return this.profileService.getProfile(value);
  }
}
