export class UpdateTaskDto {
  columnId?: number;
  title?: string;
  description?: string;
  authors?: string[];
  respondents?: string[];
  tags?: string[];
  category?: string;
  priority?: string;
  status?: string;
}
