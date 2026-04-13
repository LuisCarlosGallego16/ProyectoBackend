import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Escenario } from './entity/escenario.entity';
import { CrearEscenarioDto } from './dto/crear-escenario.dto';
import { ActualizarEscenarioDto } from './dto/actualizar.dto';

@Injectable()
export class ScenariosService {

  constructor(
    @InjectRepository(Escenario)
    private escenarioRepo: Repository<Escenario>,
  ) {}

  // ✅ Crear
  crear(dto: CrearEscenarioDto) {
    const escenario = this.escenarioRepo.create(dto);
    return this.escenarioRepo.save(escenario);
  }

  // ✅ Obtener todos
  obtenerTodos() {
    return this.escenarioRepo.find();
  }

  // ✅ Obtener uno
  async obtenerUno(id: number) {
    const escenario = await this.escenarioRepo.findOne({
      where: { id },
    });

    if (!escenario) {
      throw new NotFoundException('Escenario no encontrado');
    }

    return escenario;
  }

  // ✅ Actualizar
  async actualizar(id: number, dto: ActualizarEscenarioDto) {
    const escenario = await this.obtenerUno(id);

    Object.assign(escenario, dto);

    return this.escenarioRepo.save(escenario);
  }

  // ✅ Eliminar
  async eliminar(id: number) {
    const escenario = await this.obtenerUno(id);
    return this.escenarioRepo.remove(escenario);
  }
}