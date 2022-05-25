import { UpdateTaskDto } from './../dto/update-task.dto';
import { CreateTaskDto } from './../dto/create-task.dto';
import { Task } from './task.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IdParamsDto } from '../dto/id-params.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}

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
    return this.taskModel.create({ ...createTaskDto });
  }

  async updateTask(idParamsDto: IdParamsDto, updateTaskDto: UpdateTaskDto) {
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
