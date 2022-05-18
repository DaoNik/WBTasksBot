export interface IBotMessage {
  message_id: number;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
  };
  chat: {
    id: number;
    first_name: string;
    last_name?: string;
    username: string;
    type: string;
  };
  date: number;
  text: string;
  entities?: [];
  reply_markup?: { inline_keyboard: [] };
}

export interface IBotCallback {
  id: string;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
  };
  message: IBotMessage;
  chat_instance: string;
  data: string;
}
