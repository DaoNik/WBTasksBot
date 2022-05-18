'use strict';

require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api');
const {
  gameOptions,
  againOptions,
  taskOptions,
  newProblemsOptions,
} = require('./options');

const token = process.env.TOKEN;

const bot = new TelegramApi(token, {
  polling: true,
});
const chats = {};

async function startBot(chatId) {
  await bot.sendMessage(
    chatId,
    `Приветствую тебя в телеграм боте для управления задачами.
    Вот список того, что этот бот умеет:
    /start - выводит приветствие и список команд
    /info - выводит информацию о пользователе
    /game - предлагает сыграть в угадай число
    /problem - помогает сообщить о проблеме(работает только в личном чате с ботом)`
  );
}

async function sendInfo(chatId, msg) {
  await bot.sendMessage(
    chatId,
    `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`
  );
}

async function startGame(chatId) {
  await bot.sendMessage(
    chatId,
    `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Информация о пользователе' },
    {
      command: '/game',
      description: 'Игра угадай цифру',
    },
    { command: '/problem', description: 'Сообщить о проблеме' },
  ]);

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const typeChat = msg.chat.type;

    if (text.startsWith('/start')) {
      return startBot(chatId);
    }
    if (text.startsWith('/info')) {
      return sendInfo(chatId, msg);
    }
    if (text.startsWith('/game')) {
      return startGame(chatId);
    }
    if (text.startsWith('/problem') && typeChat === 'private') {
      return bot.sendMessage(chatId, 'Выберите действие', taskOptions);
    }
    if (text.startsWith('/problem')) {
      return bot.sendMessage(
        chatId,
        'Перейдите в чат с ботом, чтобы сообщить о проблеме',
        newProblemsOptions
      );
    }
  });

  bot.on('callback_query', (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    console.log(msg);
    if (data === '/again') {
      return startGame(chatId);
    }
    // if (data === '/newProblem') {
    //   return bot.sendMessage(chatId, 'Введите название проблемы');
    // }
    if (data === '/updateProblem') {
      return bot.sendMessage(chatId, 'Пока что нечего менять...');
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
