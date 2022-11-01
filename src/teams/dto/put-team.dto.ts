import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PutTeamDto {
  @ApiProperty({ example: 'Kuzma', description: 'Название' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
  @ApiProperty({ example: 'uuidv4.jpg', description: 'Ссылка' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly logoUrl?: string;
}
