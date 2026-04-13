import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pago } from './entity/pago.entity';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

import { Reserva } from '../reservations/entity/reserva.entity';
import { Usuario } from '../users/entity/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pago, Reserva, Usuario]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}