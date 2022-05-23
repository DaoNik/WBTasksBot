export class CreateBoardDto {
  title: string;
  authors?: string[];
  respondents?: string[];
  tags?: string[];
  categories?: string[];
}
