import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface ProfileCreationAttr {
  name: string,
  gender: string,
  status: string,
  photo: string,
}

@Table({ tableName: 'profiles' })
export class Profile extends Model<Profile, ProfileCreationAttr> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  @ApiProperty({ example: '1', description: 'Айди юзера' })
  userId: number;

  @Column({ type: DataType.STRING })
  @ApiProperty({ example: 'Текст', description: 'Пост юзера' })
  posts: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({ example: 'Гражданин/Администратум', description: 'Роли пользователя' })
  roles: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({ example: 'discord#3343', description: 'Контакты пользователя' })
  contacts: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({ example: 'someBackground.jpg', description: 'Баннер для профиля пользователя' })
  profilePhoto: string;
}