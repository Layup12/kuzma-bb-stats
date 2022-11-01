import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PutPlayerDto {
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly firstName: string;
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly middleName: string;
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly lastName: string;
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly logoUrl?: string;
}
