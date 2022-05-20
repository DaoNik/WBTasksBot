import { Injectable } from '@nestjs/common';
import { TgBotService } from './tg-bot/tg-bot.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  constructor(private tgBotService: TgBotService) {
    this.tgBotService.start();
  }
}
