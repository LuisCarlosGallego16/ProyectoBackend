import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsuariosModule } from '../users/users.module';
import { JwtEstrategia } from './estrategias/jwt.estrategia';
import { TelegramService } from './telegram.service';

@Module({
  imports: [
    UsuariosModule,
    ConfigModule,
    // Configuración dinámica del JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        //Clave secreta para firmar tokens
        secret: configService.get<string>('JWT_SECRET'),
        //Tiempo de expiración del token
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  // Servicios y estrategias disponibles en este módulo
  providers: [AuthService, JwtEstrategia, TelegramService],
  // Exportamos AuthService para usarlo en otros módulos
  exports: [AuthService],
})
export class AuthModule {}