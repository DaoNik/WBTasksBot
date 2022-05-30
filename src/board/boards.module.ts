import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BoardsController } from './boards.controller';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { BoardColumn } from './columns/column.model';
import { Task } from './tasks/task.model';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { ColumnsController } from './columns/columns.controller';
import { ColumnsService } from './columns/columns.service';
import { CommentsController } from './tasks/comments/comments.controller';

@Module({
  imports: [SequelizeModule.forFeature([Board, BoardColumn, Task])],
  controllers: [BoardsController, TasksController, ColumnsController, CommentsController],
  providers: [BoardsService, TasksService, ColumnsService],
})
export class BoardModule {}
