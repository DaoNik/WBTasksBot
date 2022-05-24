import { UpdateTaskDto } from './../dto/update-task.dto';
import { CreateTaskDto } from './../dto/create-task.dto';
import { Task } from './task.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}

  async getTasks() {
    return this.taskModel.findAll();
  }

  async getTask(id: string): Promise<Task> {
    return this.taskModel.findOne({
      where: {
        id,
      },
    });
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return this.taskModel.create({ ...createTaskDto });
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.update(
      { ...updateTaskDto },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    return task[1][0];
  }

  async deleteTask(id: string) {
    return this.taskModel
      .destroy({
        where: {
          id,
        },
      })
      .then(() => id);
  }
}
