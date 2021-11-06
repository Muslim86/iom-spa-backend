import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface FollowerCreationAttr {
  userId: number;
  subscribeId: number;
}

@Table({tableName: 'followers'})
export class Follower extends Model<Follower, FollowerCreationAttr> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  @ApiProperty({example: 1, description: 'id'})
  id: number;

  @Column({type: DataType.INTEGER})
  @ApiProperty({example: 1, description: 'id'})
  userId: number;

  @Column({type: DataType.INTEGER})
  @ApiProperty({example: 1, description: 'id'})
  subscribeId: number;
}