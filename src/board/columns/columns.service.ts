import { Task } from './../tasks/task.model';
import { UpdateColumnDto } from './../dto/update-column.dto';
import { CreateColumnDto } from './../dto/create-column.dto';
import { BoardColumn } from './column.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IdParamsDto } from '../dto/id-params.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(BoardColumn) private boardColumnModel: typeof BoardColumn,
  ) {}

  async getColumns() {
    return this.boardColumnModel.findAll();
  }

  async getColumn(idParamsDto: IdParamsDto): Promise<BoardColumn> {
    return this.boardColumnModel.findOne({
      where: {
        id: idParamsDto.id,
      },
      include: [Task],
    });
  }

  async createColumn(createColumnDto: CreateColumnDto) {
    return this.boardColumnModel.create({ ...createColumnDto });
  }

  async updateColumn(
    idParamsDto: IdParamsDto,
    updateColumnDto: UpdateColumnDto,
  ) {
    const column = await this.boardColumnModel.update(
      { ...updateColumnDto },
      {
        where: {
          id: idParamsDto.id,
        },
        returning: true,
      },
    );
    return column[1][0];
  }

  async deleteColumn(idParamsDto: IdParamsDto) {
    return this.boardColumnModel
      .destroy({
        where: {
          id: idParamsDto.id,
        },
      })
      .then(() => idParamsDto.id);
  }
}
