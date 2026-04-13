import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Deporte } from './entity/deporte.entity';
import { HorarioDeporte } from './entity/horario-deporte.entity';

import { CrearDeporteDto } from './dto/crear-deporte.dto';
import { ActualizarDeporteDto } from './dto/actualizar-deporte.dto';
import { CrearHorarioDeporteDto } from './dto/crear-horario-deporte.dto';

@Injectable()
export class DeportesService {
  // Inyección de los repositorios para manejar deportes y horarios en la base de datos
  constructor(
    @InjectRepository(Deporte)
    private deporteRepo: Repository<Deporte>,

    @InjectRepository(HorarioDeporte)
    private horarioRepo: Repository<HorarioDeporte>,
  ) {}

  // Crea un nuevo deporte en la base de datos
  async crear(dto: CrearDeporteDto): Promise<Deporte> {
    const deporte = this.deporteRepo.create(dto);
    return this.deporteRepo.save(deporte);
  }

  // Obtiene la lista de todos los deportes registrados
  obtenerTodos(): Promise<Deporte[]> {
    return this.deporteRepo.find();
  }

  // Busca un deporte por su id
  async obtenerUno(id: number): Promise<Deporte> {
    const deporte = await this.deporteRepo.findOne({
      where: { id },
    });

    // Si no existe el deporte, lanza una excepción
    if (!deporte) {
      throw new NotFoundException('Deporte no encontrado');
    }

    return deporte;
  }

  // Actualiza la información de un deporte existente
  async actualizar(
    id: number,
    dto: ActualizarDeporteDto,
  ): Promise<Deporte> {
    // Primero verifica que el deporte exista
    const deporte = await this.obtenerUno(id);

    // Asigna los nuevos datos al deporte encontrado
    Object.assign(deporte, dto);

    // Guarda los cambios en la base de datos
    return this.deporteRepo.save(deporte);
  }

  // Elimina un deporte de la base de datos
  async eliminar(id: number): Promise<void> {
    // Primero verifica que el deporte exista
    const deporte = await this.obtenerUno(id);
    await this.deporteRepo.remove(deporte);
  }

  // Crea un nuevo horario asociado a un deporte
  async crearHorario(dto: CrearHorarioDeporteDto): Promise<HorarioDeporte> {
    // Busca el deporte al que se le quiere asignar el horario
    const deporte = await this.deporteRepo.findOne({
      where: { id: dto.deporteId },
    });

    // Si el deporte no existe, lanza una excepción
    if (!deporte) {
      throw new NotFoundException('Deporte no existe');
    }

    // Crea el horario con su hora de inicio, hora de fin y deporte asociado
    const horario = this.horarioRepo.create({
      horaInicio: dto.horaInicio,
      horaFin: dto.horaFin,
      deporte,
    });

    // Guarda el horario en la base de datos
    return this.horarioRepo.save(horario);
  }

  // Obtiene todos los horarios de un deporte específico
  async obtenerHorarios(deporteId: number): Promise<HorarioDeporte[]> {
    return this.horarioRepo.find({
      where: {
        deporte: { id: deporteId },
      },
      relations: ['deporte'],
    });
  }

  // Elimina un horario por su id
  async eliminarHorario(id: number): Promise<void> {
    const horario = await this.horarioRepo.findOne({
      where: { id },
    });

    // Si no existe el horario, lanza una excepción
    if (!horario) {
      throw new NotFoundException('Horario no encontrado');
    }

    // Elimina el horario encontrado
    await this.horarioRepo.remove(horario);
  }
}