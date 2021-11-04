import { ApiProperty } from '@nestjs/swagger';

export class UserDto {

  constructor(model) {
    this.name = model.name
    this.gender = model.gender
    this.status = model.status
    this.photo = model.photo
  }

  @ApiProperty({ example: 'Pasha', description: 'username' })
  readonly name: string;

  @ApiProperty({ example: 'male', description: 'user gender' })
  readonly gender: string;

  @ApiProperty({ example: 'Love bus', description: 'user status' })
  readonly status: string;

  @ApiProperty({ example: 'example.jpg', description: 'user photo' })
  readonly photo: string;
}