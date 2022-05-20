import { Injectable } from '@nestjs/common';
import { TgBotService } from './tg-bot/tg-bot.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  constructor(private tgBotService: TgBotService) {
    setTimeout(() => {
      this.tgBotService.start();
    }, 3000);
  }
}
