import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';

@Module({
  controllers: [BoardController, TasksController],
  providers: [BoardService, TasksService],
})
export class BoardModule {}
