import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService],
  imports: [TypeOrmModule.forFeature([Reserva])],
})
export class ReservationsModule {}
