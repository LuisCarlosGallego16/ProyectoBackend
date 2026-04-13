import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reserva } from './entity/reserva.entity';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';

import { Usuario } from '../users/entity/usuario.entity';
import { Deporte } from '../sports/entity/deporte.entity';
import { Escenario } from '../scenarios/entity/escenario.entity';
import { HorarioDeporte } from '../sports/entity/horario-deporte.entity';

// Módulo encargado de agrupar la configuración relacionada con las reservas
@Module({
  // Importa las entidades necesarias para poder usar sus repositorios con TypeORM
  imports: [
    TypeOrmModule.forFeature([
      Reserva,
      Usuario,
      Deporte,
      Escenario,
      HorarioDeporte,
    ]),
  ],

  // Registra el controlador que manejará las rutas de reservas
  controllers: [ReservationsController],

  // Registra el servicio que contiene la lógica de negocio de reservas
  providers: [ReservationsService],
})
export class ReservationsModule {}