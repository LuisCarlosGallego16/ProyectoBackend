import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScenariosModule } from './scenarios/scenarios.module';
import { SportsModule } from './sports/sports.module';
import { ReservationsModule } from './reservations/reservations.module';
import { PaymentsModule } from './payments/payments.module';
import { CommonModule } from './common/common.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './users/entities/usuario.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // BD 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'natavelez0903', 
      database: 'reserva_db',
      entities: [Usuario],
      synchronize: true, 
    }),

    UsersModule,
    AuthModule,
    ScenariosModule,
    SportsModule,
    ReservationsModule,
    PaymentsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}