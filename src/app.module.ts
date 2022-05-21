import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TgBotService } from './tg-bot/tg-bot.service';
import { User } from './tg-bot/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, TgBotService],
})
export class AppModule {}
