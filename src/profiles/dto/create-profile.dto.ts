import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ example: '5', description: 'user id' })
  userId: number;
  @ApiProperty({ example: '[{...},{...}]', description: 'user posts array' })
  posts?: [];
  @ApiProperty({ example: 'Admin', description: 'user role' })
  roles?: string;
  @ApiProperty({ example: 'someMail@mail.com', description: 'user contacts' })
  contacts?: string;
  @ApiProperty({ example: 'myPhoto.jpg', description: 'user profile photo' })
  profilePhoto?: string;
}