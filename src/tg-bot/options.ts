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
export const linkChatOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Перейти в чат с ботом', url: 'https://t.me/WBTasksBot' }],
    ],
  }),
};
