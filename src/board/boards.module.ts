import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BoardsController } from './boards.controller';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { BoardColumn } from './tasks/column.model';
import { Task } from './tasks/task.model';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [SequelizeModule.forFeature([Board, BoardColumn, Task])],
  controllers: [BoardsController, TasksController],
  providers: [BoardsService, TasksService],
})
export class BoardModule {}
