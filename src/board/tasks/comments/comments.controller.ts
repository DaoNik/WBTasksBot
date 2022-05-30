import { CommentsService } from './comments.service';
import { Controller, Get, Param } from '@nestjs/common';
import { IdParamsDto } from 'src/board/dto/id-params.dto';

@Controller('tasks/:id/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get()
  async getComments(@Param() idParamsDto: IdParamsDto) {
    return this.commentsService.getComments(idParamsDto);
  }
}
