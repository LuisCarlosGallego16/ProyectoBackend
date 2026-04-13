import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pago } from './entity/pago.entity';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

import { Reserva } from '../reservations/entity/reserva.entity';
import { Usuario } from '../users/entity/usuario.entity';

// El módulo de pagos se encarga de gestionar las operaciones relacionadas con los pagos, incluyendo la creación, actualización y eliminación de registros de pago.
// Además, se integra con las entidades de reserva y usuario para mantener la coherencia de los datos y facilitar la gestión de las transacciones.
@Module({
  imports: [
    TypeOrmModule.forFeature([Pago, Reserva, Usuario]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}