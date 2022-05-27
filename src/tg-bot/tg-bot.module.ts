import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TgBotService } from './tg-bot.service';
import { Task } from 'src/board/tasks/task.model';

@Module({
  imports: [SequelizeModule.forFeature([Task])],
  providers: [TgBotService],
})
export class TgBotModule {
  constructor(private tgBotService: TgBotService) {
    this.tgBotService.start();
  }
}
