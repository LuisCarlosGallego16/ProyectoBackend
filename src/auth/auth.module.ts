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

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtEstrategia, TelegramService],
  exports: [AuthService],
})
export class AuthModule {}