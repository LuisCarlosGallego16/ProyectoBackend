import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // Este método se ejecuta en cada petición que pase por este middleware
  use(req: Request, res: Response, next: NextFunction) {
    //Imprime en consola:
    // - Fecha y hora actual
    // - Método HTTP (GET, POST, etc.)
    // - URL solicitada
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    // Permite que la petición continúe hacia el siguiente middleware o controlador
    next();
  }
}