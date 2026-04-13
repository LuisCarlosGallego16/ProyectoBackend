import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Escenario } from './entity/escenario.entity';
import { ScenariosService } from './scenarios.service';
import { ScenariosController } from './scenarios.controller';

// Módulo que agrupa todo lo relacionado con escenarios
@Module({
  // Permite usar el repositorio de la entidad Escenario
  imports: [TypeOrmModule.forFeature([Escenario])],

  // Controlador que maneja las rutas HTTP del módulo
  controllers: [ScenariosController],

  // Servicio que contiene la lógica de negocio
  providers: [ScenariosService],

  // Exporta el servicio para que otros módulos puedan utilizarlo
  exports: [ScenariosService],
})
export class ScenariosModule {}