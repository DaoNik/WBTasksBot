import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsInt({ message: 'Поле с id задачи должно быть целым числом' })
  @IsNotEmpty({ message: 'Поле c id задачи не должно быть пустым' })
  taskId: number;

  @IsString({ message: 'Поле с текстом комментария должно быть строкой' })
  @Length(1, 500, {
    message: 'Длина комментария должно быть длинной от 1 до 500 символов',
  })
  @Transform(({ value }) => value.trim())
  text: string;

  @IsString({ message: 'Поле с текстом комментария должно быть строкой' })
  @Length(1, 100, {
    message: 'Длина автора должно быть длинной от 1 до 500 символов',
  })
  @Transform(({ value }) => value.trim())
  author: string;
}
