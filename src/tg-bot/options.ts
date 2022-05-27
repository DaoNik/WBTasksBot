export const taskOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          type: 'web_app',
          text: 'Сообщить о проблеме',
          web_app: { url: 'https://wbbase.site/api/form' },
        },
      ],
    ],
  }),
};
export const newProblemsOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Сообщить о проблеме', url: 'https://t.me/WBTasksBot' }],
    ],
  }),
};
