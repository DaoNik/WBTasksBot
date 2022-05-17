require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');

const token = process.env.TOKEN;

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
};

const start = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Информация о пользователе' },
    {
      command: '/game',
      description: 'Игра угадай цифру',
    },
  ]);

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
      await bot.sendSticker(
        chatId,
        'https://tlgrm.ru/_/stickers/add/40b/add40b02-3117-40b6-ab69-74a8ea5cc3af/1.jpg'
      );
      return bot.sendMessage(
        chatId,
        'Привет, Друг! Приветствую тебя в телеграм боте для управления задачами'
      );
    }
    if (text === '/info') {
      return bot.sendMessage(
        chatId,
        `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`
      );
    }
    if (text === '/game') {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, `Ты написал ${text}`);
  });

  bot.on('callback_query', (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/again') {
      return startGame(chatId);
    }
    if (data === chats[chatId].toString()) {
      return bot.sendMessage(
        chatId,
        `Поздравляю, ты отгадал цифру ${chats[chatId]}`,
        againOptions
      );
    } else {
      return bot.sendMessage(
        chatId,
        `К сожалению, ты не угадал, бот загадал ${chats[chatId]}`,
        againOptions
      );
    }
  });
};

start();
