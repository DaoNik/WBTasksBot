import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateColumnDto {
  @IsString({ message: 'Поле с названием колонки должно быть строкой' })
  @Length(4, 50, {
    message: 'Поле с названием колонки должно быть от 4 до 50 символов',
  })
  @IsNotEmpty({ message: 'Поле с названием колонки не может быть пустым' })
  @Transform(({ value }) => value.trim())
  @IsOptional()
  title?: string;

  @IsInt({ message: 'Поле с ID доски должно быть целым числом' })
  @IsNotEmpty({ message: 'Поле с ID доски не может быть пустым' })
  @IsOptional()
  boardId?: number;
}
