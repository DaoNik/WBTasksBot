import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateColumnDto {
  @IsString({ message: 'Поле с названием колонки должно быть строкой' })
  @Length(4, 50, {
    message: 'Поле с названием колонки должно быть от 4 до 50 символов',
  })
  @IsNotEmpty({ message: 'Поле с названием колонки не может быть пустым' })
  @Transform(({ value }) => value.trim())
  title: string;

  @IsInt({ message: 'Поле с ID доски должно быть целым числом' })
  @IsNotEmpty({ message: 'Поле с ID доски не может быть пустым' })
  boardId: number;
}
