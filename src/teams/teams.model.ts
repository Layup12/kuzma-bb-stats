import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface TeamCreationAttrs {
  name: string;
  logoUrl?: string;
}

@Table({ tableName: 'teams' })
export class Team extends Model<Team, TeamCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Kuzma', description: 'Название команды' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: '/storage/logo/kuzma.jpg',
    description: 'Ссылка на лого',
  })
  @Column({
    type: DataType.STRING,
  })
  logoUrl: string;
}
