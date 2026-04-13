import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reserva } from './entity/reserva.entity';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';

import { Usuario } from '../users/entity/usuario.entity';
import { Deporte } from '../sports/entity/deporte.entity';
import { Escenario } from '../scenarios/entity/escenario.entity';
import { HorarioDeporte } from '../sports/entity/horario-deporte.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reserva,
      Usuario,
      Deporte,
      Escenario,
      HorarioDeporte,
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}