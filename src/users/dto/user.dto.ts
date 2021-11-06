import { ApiProperty } from '@nestjs/swagger';

export class UserDto {

  constructor(model) {
    this.id = model.id
    this.name = model.name
    this.gender = model.gender
    this.status = model.status
    this.photo = model.photo
    this.follower = model.follower
  }

  @ApiProperty({ example: 'Pasha', description: 'username' })
  readonly name: string;

  @ApiProperty({ example: 'male', description: 'user gender' })
  readonly gender: string;

  @ApiProperty({ example: 'Love bus', description: 'user status' })
  readonly status: string;

  @ApiProperty({ example: 'example.jpg', description: 'user photo' })
  readonly photo: string;

  @ApiProperty({ example: 'true', description: 'user subscribe' })
  readonly follower: boolean;

  @ApiProperty({ example: '1', description: 'user id' })
  readonly id: number;
}