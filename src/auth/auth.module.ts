import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtEstrategia } from './estrategias/jwt.estrategia';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'mi_secreto_super_seguro',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtEstrategia],
})
export class AuthModule {}