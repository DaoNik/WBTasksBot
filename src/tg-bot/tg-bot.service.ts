import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as TelegramBot from 'node-telegram-bot-api';
import { taskOptions, linkChatOptions } from './options';
import { Task } from '../board/tasks/task.model';

@Injectable()
export class TgBotService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}

  bot = new TelegramBot(process.env.TOKEN, {
    polling: true,
  });
  chats = {};

  startBot = async (chatId: number) => {
    await this.bot.sendMessage(
      chatId,
      `Приветствую тебя в телеграм боте для управления задачами.
      Вот список того, что этот бот умеет:
      /start - выводит приветствие и список команд
      /info - выводит информацию о пользователе (#123)(работает только в личном чате с ботом)
      #номер_вашей_задачи - выводит статус вашей задачи
      /problem - помогает сообщить о проблеме(работает только в личном чате с ботом)`,
    );
  };

  sendInfo = async (chatId: number, msg) => {
    const name = msg.from.last_name
      ? `${msg.from.first_name} ${msg.from.last_name}`
      : msg.from.first_name;

    await this.bot.sendMessage(chatId, `Тебя зовут ${name}`);
  };

  sendStatus = async (chatId: number, msg) => {
    console.log(msg.text.slice(1));
    const task = await this.taskModel.findOne({
      where: {
        id: msg.text.slice(1),
      },
      attributes: ['status'],
    });
    if (task?.status) {
      return this.bot.sendMessage(chatId, `Статус этой задачи ${task.status}`);
    }
    return this.bot.sendMessage(
      chatId,
      'Нет такой задачи, возможно, она уже была решена',
    );
  };

  start = async () => {
    this.bot.setMyCommands([
      { command: '/start', description: 'Начальное приветствие' },
      { command: '/info', description: 'Информация о пользователе' },
      { command: '/problem', description: 'Сообщить о проблеме' },
    ]);

    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text;
      const typeChat = msg.chat.type;

      try {
        if (text.startsWith('/start')) {
          return this.startBot(chatId);
        }
        if (text.startsWith('/info')) {
          return this.sendInfo(chatId, msg);
        }
        if (text.startsWith('/problem') && typeChat === 'private') {
          return this.bot.sendMessage(chatId, 'Выберите действие', taskOptions);
        }
        if (text.startsWith('#') && typeChat === 'private') {
          return this.sendStatus(chatId, msg);
        }
        if (text.startsWith('/problem')) {
          return this.bot.sendMessage(
            chatId,
            'Перейдите в чат с ботом, чтобы сообщить о проблеме',
            linkChatOptions,
          );
        }
      } catch (e) {
        return this.bot.sendMessage(chatId, 'К сожалению, произошла ошибка');
      }
    });

    this.bot.on('callback_query', async (msg) => {
      const data = msg.data;
      const chatId = msg.message.chat.id;

      if (data === '/updateProblem') {
        return this.bot.sendMessage(chatId, 'Пока что нечего менять...');
      }
    });
  };
}
