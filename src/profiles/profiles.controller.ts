import { Controller, Get } from '@nestjs/common';

@Controller('profiles')
export class ProfilesController {

  @Get()
  getProfile() {

  }
}
