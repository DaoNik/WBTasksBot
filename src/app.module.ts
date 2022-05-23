import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './tg-bot/user.model';
import { TgBotModule } from './tg-bot/tg-bot.module';
import { BoardModule } from './board/boards.module';
import { Board } from './board/board.model';
import { BoardColumn } from './board/tasks/column.model';
import { Task } from './board/tasks/task.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Board, BoardColumn, Task],
      autoLoadModels: true,
      synchronize: true,
    }),
    TgBotModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
