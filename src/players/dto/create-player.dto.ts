import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly lastName: string;
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly firstName: string;
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly middleName?: string;
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly logoUrl?: string;
}
