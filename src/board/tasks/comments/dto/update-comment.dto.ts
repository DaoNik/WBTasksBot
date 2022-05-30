import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString({ message: 'Поле с текстом комментария должно быть строкой' })
  @Length(1, 500, {
    message: 'Длина комментария должно быть длинной от 1 до 500 символов',
  })
  text: string;

  @IsString({ message: 'Поле с текстом комментария должно быть строкой' })
  @Length(1, 100, {
    message: 'Длина автора должно быть длинной от 1 до 500 символов',
  })
  @IsOptional()
  author: string;
}
