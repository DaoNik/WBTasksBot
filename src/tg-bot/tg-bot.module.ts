import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TgBotService } from './tg-bot.service';
import { User } from './user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [TgBotService],
})
export class TgBotModule {
  constructor(private tgBotService: TgBotService) {
    this.tgBotService.start();
  }
}
