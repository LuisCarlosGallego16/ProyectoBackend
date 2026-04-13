import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  obtenerMensaje(): string {
    return 'API de reservas deportivas funcionando correctamente';
  }
}