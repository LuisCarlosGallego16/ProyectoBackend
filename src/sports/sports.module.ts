import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Deporte } from './entity/deporte.entity';
import { HorarioDeporte } from './entity/horario-deporte.entity';

import { DeportesService } from './sports.service';
import { DeportesController } from './sports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deporte, HorarioDeporte])],
  controllers: [DeportesController],
  providers: [DeportesService],
  exports: [DeportesService],
})
export class DeportesModule {}