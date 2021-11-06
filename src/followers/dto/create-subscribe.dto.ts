import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscribeDto {
  @ApiProperty({ example: '1', description: 'user id' })
  userId: number;
  @ApiProperty({ example: '6', description: 'id of subscribe' })
  subscribeId: number;
}