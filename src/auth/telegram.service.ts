import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelegramService {

  // Token del bot de Telegram (se obtiene desde @BotFather)
  // Se lee desde las variables de entorno (.env)
  private botToken = process.env.TELEGRAM_BOT_TOKEN;
  //ID del chat donde se enviarán los mensajes
  private chatId = process.env.TELEGRAM_CHAT_ID;

  // Método para enviar un mensaje a Telegram
  async enviarMensaje(mensaje: string) {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    // Hace una petición POST a Telegram
    // Enviando el chat_id y el mensaje
    await axios.post(url, {
      chat_id: this.chatId,
      text: mensaje,
    });
  }
}