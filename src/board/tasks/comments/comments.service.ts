import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IdParamsDto } from 'src/board/dto/id-params.dto';
import { Comment } from './comment.model';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentModel: typeof Comment) {}

  async getComments(idParamsDto: IdParamsDto) {
    return this.commentModel.findAll({
      where: {
        taskId: idParamsDto.id,
      },
    });
  }
}
