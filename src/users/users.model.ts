import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttr {
  name: string,
  gender?: string,
  status?: string,
  photo?: string,
  follower?:any,
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  @ApiProperty({ example: '1', description: 'Айди юзера' })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  @ApiProperty({ example: 'Vasya Pupkin', description: 'Имя и фамилия юзера' })
  name: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({ example: 'Soas@!29!jkds', description: 'some password' })
  password: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({ example: 'муж/жен', description: 'Пол юзера' })
  gender: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({ example: 'В поисках работы', description: 'Статус пользователя' })
  status: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({ example: 'someUser.jpg', description: 'Фото пользователя' })
  photo: string;
}