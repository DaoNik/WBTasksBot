module.exports = {
  gameOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: '1', callback_data: '1' },
          { text: '2', callback_data: '2' },
          { text: '3', callback_data: '3' },
        ],
        [
          { text: '4', callback_data: '4' },
          { text: '5', callback_data: '5' },
          { text: '6', callback_data: '6' },
        ],
        [
          { text: '7', callback_data: '7' },
          { text: '8', callback_data: '8' },
          { text: '9', callback_data: '9' },
        ],
        [{ text: '0', callback_data: '0' }],
      ],
    }),
  },
  againOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [[{ text: 'Играть еще раз', callback_data: '/again' }]],
    }),
  },
  taskOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            type: 'web_app',
            text: 'Chat',
            web_app: { url: 'https://wbschool-chat.ru/home' },
          },
        ],
        [
          {
            text: 'Изменить существующую проблему',
            callback_data: '/updateProblem',
          },
        ],
      ],
    }),
  },
  newProblemsOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Сообщить о проблеме', url: 'https://t.me/WBTasksBot' }],
      ],
    }),
  },
};
