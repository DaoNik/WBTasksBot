import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IdParamsDto } from '../dto/id-params.dto';
import { BoardColumn } from '../columns/column.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskModel: typeof Task,
    @InjectModel(BoardColumn) private columnModel: typeof BoardColumn,
  ) {}

  async getTasks() {
    return this.taskModel.findAll();
  }

  async getTask(idParamsDto: IdParamsDto): Promise<Task> {
    return this.taskModel
      .findOne({
        where: {
          id: idParamsDto.id,
        },
      })
      .then((task) => {
        if (!task) {
          throw new NotFoundException('Задачи с таким ID не существует');
        }

        return task;
      });
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const columnId = createTaskDto.columnId;

    await this.columnModel
      .findOne({ where: { id: columnId } })
      .then((column) => {
        if (column.boardId !== createTaskDto.boardId) {
          throw new BadRequestException(
            'ID доски у колонки и у задачи должны совпадать',
          );
        }
      });

    return this.taskModel.create({ ...createTaskDto });
  }

  async updateTask(idParamsDto: IdParamsDto, updateTaskDto: UpdateTaskDto) {
    if (updateTaskDto['boardId']) {
      throw new BadRequestException('Менять ID доски у задачи запрещено');
    }

    return this.taskModel
      .update(
        { ...updateTaskDto },
        {
          where: {
            id: idParamsDto.id,
          },
          returning: true,
        },
      )
      .then((task) => {
        if (!task[1][0]) {
          throw new NotFoundException('Задачи с таким ID не существует');
        }

        return task[1][0];
      });
  }

  async deleteTask(idParamsDto: IdParamsDto) {
    return this.taskModel
      .destroy({
        where: {
          id: idParamsDto.id,
        },
      })
      .then((deletedRows) => {
        if (!deletedRows) {
          throw new NotFoundException('Задачи с таким ID не существует');
        }

        return idParamsDto.id;
      });
  }
}
