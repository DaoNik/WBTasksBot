import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateBoardDto {
  @IsString({ message: 'Поле с названием доски должно быть строкой' })
  @Length(4, 100, {
    message: 'Поле с названием доски должно быть от 4 до 100 символов',
  })
  @IsNotEmpty({ message: 'Поле с названием доски не может быть пустым' })
  @Transform(({ value }) => value.trim())
  title: string;

  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map((item: any) =>
          typeof item === 'string' ? item.trim() : item,
        )
      : value,
  )
  @IsString({
    each: true,
    message: 'Поле с авторами доски должно быть массивом строк',
  })
  @IsNotEmpty({
    each: true,
    message: 'Элементы массива с авторами не могут быть пыстыми',
  })
  @IsOptional()
  authors?: string[];

  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map((item: any) =>
          typeof item === 'string' ? item.trim() : item,
        )
      : value,
  )
  @IsString({
    each: true,
    message: 'Поле с отделами доски должно быть массивом строк',
  })
  @IsNotEmpty({
    each: true,
    message: 'Элементы массива с отделами не могут быть пыстыми',
  })
  @IsOptional()
  departments?: string[];

  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map((item: any) =>
          typeof item === 'string' ? item.trim() : item,
        )
      : value,
  )
  @IsString({
    each: true,
    message: 'Поле с тегами доски должно быть массивом строк',
  })
  @IsNotEmpty({
    each: true,
    message: 'Элементы массива с тегами не могут быть пыстыми',
  })
  @IsOptional()
  tags?: string[];

  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map((item: any) =>
          typeof item === 'string' ? item.trim() : item,
        )
      : value,
  )
  @IsString({
    each: true,
    message: 'Поле с категориями доски должно быть массивом строк',
  })
  @IsNotEmpty({
    each: true,
    message: 'Элементы массива с категориями не могут быть пыстыми',
  })
  @IsOptional()
  categories?: string[];

  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map((item: any) =>
          typeof item === 'string' ? item.trim() : item,
        )
      : value,
  )
  @IsString({
    each: true,
    message: 'Поле с наблюдателями доски должно быть массивом строк',
  })
  @IsNotEmpty({
    each: true,
    message: 'Элементы массива с наблюдателями не могут быть пыстыми',
  })
  @IsOptional()
  watchers?: string[];

  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map((item: any) =>
          typeof item === 'string' ? item.trim() : item,
        )
      : value,
  )
  @IsString({
    each: true,
    message: 'Поле с проектами должно быть массивом строк',
  })
  @IsNotEmpty({
    each: true,
    message: 'Элементы массива с проектами не могут быть пыстыми',
  })
  @IsOptional()
  projects: string[];
}
