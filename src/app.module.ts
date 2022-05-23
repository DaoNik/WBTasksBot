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
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
