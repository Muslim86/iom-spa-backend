import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface AuthCreationAttr {
  userId: number;
  accessToken: string;
  refreshToken: string;
}

@Table
export class Auth extends Model<Auth, AuthCreationAttr> {

  @ApiProperty({example:'', description:'row id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example:'', description:'user id'})
  @Column({type: DataType.INTEGER})
  userId: number;

  @ApiProperty({example:'', description:'string of access token'})
  @Column({type: DataType.STRING})
  accessToken: string;

  @ApiProperty({example:'', description:'string of refresh token'})
  @Column({type: DataType.STRING})
  refreshToken: string;
}