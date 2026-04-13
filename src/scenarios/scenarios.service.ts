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
  // Inyección del repositorio de escenarios para acceder a la base de datos
  constructor(
    @InjectRepository(Escenario)
    private escenarioRepo: Repository<Escenario>,
  ) {}

  // Crea un nuevo escenario en la base de datos
  crear(dto: CrearEscenarioDto) {
    const escenario = this.escenarioRepo.create(dto);
    return this.escenarioRepo.save(escenario);
  }

  // Obtiene la lista de todos los escenarios registrados
  obtenerTodos() {
    return this.escenarioRepo.find();
  }

  // Busca un escenario por su id
  async obtenerUno(id: number) {
    const escenario = await this.escenarioRepo.findOne({
      where: { id },
    });

    // Si no existe el escenario, lanza una excepción
    if (!escenario) {
      throw new NotFoundException('Escenario no encontrado');
    }

    return escenario;
  }

  // Actualiza la información de un escenario existente
  async actualizar(id: number, dto: ActualizarEscenarioDto) {
    // Primero verifica que el escenario exista
    const escenario = await this.obtenerUno(id);

    // Asigna los nuevos datos recibidos al escenario
    Object.assign(escenario, dto);

    // Guarda los cambios en la base de datos
    return this.escenarioRepo.save(escenario);
  }

  // Elimina un escenario de la base de datos
  async eliminar(id: number) {
    // Primero verifica que el escenario exista
    const escenario = await this.obtenerUno(id);

    // Elimina el escenario encontrado
    return this.escenarioRepo.remove(escenario);
  }
}