import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTaskDto {
  @IsInt({ message: 'Поле с ID колонки должно быть целым числом' })
  @IsNotEmpty({ message: 'Поле с ID колонки не может быть пустым' })
  columnId: number;

  @IsInt({ message: 'Поле с ID доски должно быть целым числом' })
  @IsNotEmpty({ message: 'Поле с ID доски не может быть пустым' })
  boardId: number;

  @IsString({ message: 'Поле с названием задачи должно быть строкой' })
  @Length(4, 100, {
    message: 'Поле с названием задачи должно быть от 4 до 100 символов',
  })
  @IsNotEmpty({ message: 'Поле с названием задачи не может быть пустым' })
  @Transform(({ value }) => value.trim())
  title: string;

  @IsString({
    each: true,
    message: 'Поле с массивом описания задачи не может быть пустым',
  })
  @IsNotEmpty({
    message: 'Поле с массивом описания задачи не может быть пустым',
  })
  @IsOptional()
  description: string[];

  @IsString({
    each: true,
    message: 'Поле с ответственными за задачу должно быть массивом строк',
  })
  @IsOptional()
  authors?: string[];

  @IsString({
    each: true,
    message: 'Поле с отделами задачи должно быть массивом строк',
  })
  @IsOptional()
  departments?: string[];

  @IsString({
    each: true,
    message: 'Поле с тегами задачи должно быть массивом строк',
  })
  @IsOptional()
  tags?: string[];

  @IsString({
    message: 'Поле с категорией задачи должно быть строкой',
  })
  @IsNotEmpty({ message: 'Поле с категорией задачи не может быть пустым' })
  @Transform(({ value }) => value.trim())
  @IsOptional()
  category?: string;

  @IsString({
    message: 'Поле с приоритетом задачи должно быть строкой',
  })
  @IsNotEmpty({ message: 'Поле с приоритетом задачи не может быть пустым' })
  @Transform(({ value }) => value.trim())
  @IsOptional()
  priority: string;

  @IsString({
    message: 'Поле со статусом задачи должно быть строкой',
  })
  @IsNotEmpty({ message: 'Поле со статусом задачи не может быть пустым' })
  @Transform(({ value }) => value.trim())
  @IsOptional()
  status: string;

  @IsString({
    each: true,
    message: 'Поле с наблюдателями задачи должно быть массивом строк',
  })
  @IsOptional()
  watchers?: string[];

  @IsString({
    message: 'Поле с дедлайном задачи должно быть строкой',
  })
  @IsNotEmpty({ message: 'Поле с дедлайном задачи не может быть пустым' })
  @Transform(({ value }) => value.trim())
  @IsOptional()
  deadline?: string;

  @IsString({
    message: 'Поле с автором задачи должно быть строкой',
  })
  @IsNotEmpty({ message: 'Поле с автором задачи не может быть пустым' })
  @Transform(({ value }) => value.trim())
  contact: string;
}
