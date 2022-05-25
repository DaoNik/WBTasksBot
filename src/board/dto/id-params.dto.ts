import { IsNumberString } from 'class-validator';

export class IdParamsDto {
  @IsNumberString()
  id: number;
}
