import { Task } from './../tasks/task.model';
import { UpdateColumnDto } from './../dto/update-column.dto';
import { CreateColumnDto } from './../dto/create-column.dto';
import { BoardColumn } from './column.model';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.boardColumnModel
      .findOne({
        where: {
          id: idParamsDto.id,
        },
        include: [Task],
      })
      .then((column) => {
        if (!column) {
          throw new NotFoundException('Колонки с таким ID не существует');
        }

        return column;
      });
  }

  async createColumn(createColumnDto: CreateColumnDto) {
    return this.boardColumnModel.create({ ...createColumnDto });
  }

  async updateColumn(
    idParamsDto: IdParamsDto,
    updateColumnDto: UpdateColumnDto,
  ) {
    return this.boardColumnModel
      .update(
        { ...updateColumnDto },
        {
          where: {
            id: idParamsDto.id,
          },
          returning: true,
        },
      )
      .then((column) => {
        if (!column[1][0]) {
          throw new NotFoundException('Колонки с таким ID не существует');
        }

        return column[1][0];
      });
  }

  async deleteColumn(idParamsDto: IdParamsDto) {
    return this.boardColumnModel
      .destroy({
        where: {
          id: idParamsDto.id,
        },
      })
      .then((deletedRows) => {
        if (!deletedRows) {
          throw new NotFoundException('Колонки с таким ID не существует');
        }

        return idParamsDto.id;
      });
  }
}
