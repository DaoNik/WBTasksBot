import { CreateTaskDto } from './../dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { IdParamsDto } from '../dto/id-params.dto';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  getTask(@Param() idParamsDto: IdParamsDto): Promise<Task> {
    return this.tasksService.getTask(idParamsDto);
  }

  @Post()
  @UseFilters(new ValidationExceptionFilter())
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch(':id')
  @UseFilters(new ValidationExceptionFilter())
  updateTask(
    @Param() idParamsDto: IdParamsDto,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(idParamsDto, updateTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param() idParamsDto: IdParamsDto) {
    return this.tasksService.deleteTask(idParamsDto);
  }
}
