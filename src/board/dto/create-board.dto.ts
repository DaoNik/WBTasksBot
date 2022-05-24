import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateBoardDto {
  @IsString({ message: 'Поле с названием доски должно быть строкой' })
  @Length(4, 100, {
    message: 'Поле с названием доски должно быть от 4 до 100 символов',
  })
  @IsNotEmpty({ message: 'Поле с названием доски не может быть пустым' })
  title: string;

  @IsString({
    each: true,
    message: 'Поле с авторами доски должно быть массивом строк',
  })
  @IsOptional()
  authors?: string[];

  @IsString({
    each: true,
    message: 'Поле с отделами доски должно быть массивом строк',
  })
  @IsOptional()
  respondents?: string[];

  @IsString({
    each: true,
    message: 'Поле с тегами доски должно быть массивом строк',
  })
  @IsOptional()
  tags?: string[];

  @IsString({
    each: true,
    message: 'Поле с категориями доски должно быть массивом строк',
  })
  @IsOptional()
  categories?: string[];
}
