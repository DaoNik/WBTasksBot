import { Task } from './../tasks/task.model';
import { UpdateColumnDto } from './../dto/update-column.dto';
import { CreateColumnDto } from './../dto/create-column.dto';
import { BoardColumn } from './column.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(BoardColumn) private boardColumnModel: typeof BoardColumn,
  ) {}

  async getColumns() {
    return this.boardColumnModel.findAll();
  }

  async getColumn(id: string): Promise<BoardColumn> {
    return this.boardColumnModel.findOne({
      where: {
        id,
      },
      include: [Task],
    });
  }

  async createColumn(createColumnDto: CreateColumnDto) {
    return this.boardColumnModel.create({ ...createColumnDto });
  }

  async updateColumn(id: string, updateColumnDto: UpdateColumnDto) {
    const column = await this.boardColumnModel.update(
      { ...updateColumnDto },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    return column[1][0];
  }

  async deleteColumn(id: string) {
    return this.boardColumnModel
      .destroy({
        where: {
          id,
        },
      })
      .then(() => id);
  }
}
