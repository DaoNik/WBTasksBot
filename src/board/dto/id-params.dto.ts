import { IsNumberString } from 'class-validator';

export class IdParamsDto {
  @IsNumberString({}, { message: 'Неверный ID' })
  id: number;
}
