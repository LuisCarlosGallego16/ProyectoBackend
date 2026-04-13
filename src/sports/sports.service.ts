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
  constructor(
    @InjectRepository(Deporte)
    private deporteRepo: Repository<Deporte>,

    @InjectRepository(HorarioDeporte)
    private horarioRepo: Repository<HorarioDeporte>,
  ) {}

  // =========================
  // DEPORTES
  // =========================

  async crear(dto: CrearDeporteDto): Promise<Deporte> {
    const deporte = this.deporteRepo.create(dto);
    return this.deporteRepo.save(deporte);
  }

  obtenerTodos(): Promise<Deporte[]> {
    return this.deporteRepo.find();
  }

  async obtenerUno(id: number): Promise<Deporte> {
    const deporte = await this.deporteRepo.findOne({
      where: { id },
    });

    if (!deporte) {
      throw new NotFoundException('Deporte no encontrado');
    }

    return deporte;
  }

  async actualizar(
    id: number,
    dto: ActualizarDeporteDto,
  ): Promise<Deporte> {
    const deporte = await this.obtenerUno(id);

    Object.assign(deporte, dto);

    return this.deporteRepo.save(deporte);
  }

  async eliminar(id: number): Promise<void> {
    const deporte = await this.obtenerUno(id);
    await this.deporteRepo.remove(deporte);
  }

  // =========================
  // HORARIOS
  // =========================

  async crearHorario(dto: CrearHorarioDeporteDto): Promise<HorarioDeporte> {
    // 🔥 Validar que el deporte exista
    const deporte = await this.deporteRepo.findOne({
      where: { id: dto.deporteId },
    });

    if (!deporte) {
      throw new NotFoundException('Deporte no existe');
    }

    // 🔥 Crear horario
    const horario = this.horarioRepo.create({
      horaInicio: dto.horaInicio,
      horaFin: dto.horaFin,
      deporte,
    });

    return this.horarioRepo.save(horario);
  }

  async obtenerHorarios(deporteId: number): Promise<HorarioDeporte[]> {
    return this.horarioRepo.find({
      where: {
        deporte: { id: deporteId },
      },
      relations: ['deporte'],
    });
  }

  async eliminarHorario(id: number): Promise<void> {
    const horario = await this.horarioRepo.findOne({
      where: { id },
    });

    if (!horario) {
      throw new NotFoundException('Horario no encontrado');
    }

    await this.horarioRepo.remove(horario);
  }
}