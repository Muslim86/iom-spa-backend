import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Pasha', description: 'username' })
  readonly name: string;

  @ApiProperty({ example: 'somePass', description: 'user password' })
  readonly password: string;

  @ApiProperty({ example: 'male', description: 'user gender' })
  readonly gender?: string;

  @ApiProperty({ example: 'Love bus', description: 'user status' })
  readonly status?: string;

  @ApiProperty({ example: 'example.jpg', description: 'user photo' })
  readonly photo?: string;
}