import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface PlayerCreationAttrs {
  lastName: string;
  firstName: string;
  middleName?: string;
  avatar?: string;
}

@Table({ tableName: 'players' })
export class Player extends Model<Player, PlayerCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия игрока' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({ example: 'Иван', description: 'Имя игрока' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество игрока' })
  @Column({
    type: DataType.STRING,
  })
  middleName?: string;

  @ApiProperty({
    example: '/storage/logo/photo.jpg',
    description: 'Ссылка на аватар',
  })
  @Column({
    type: DataType.STRING,
  })
  avatarUrl?: string;
}
