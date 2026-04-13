import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reserva } from './entity/reserva.entity';
import { CrearReservaDto } from './dto/crear-reserva.dto';

import { Usuario } from '../users/entity/usuario.entity';
import { Deporte } from '../sports/entity/deporte.entity';
import { Escenario } from '../scenarios/entity/escenario.entity';
import { HorarioDeporte } from '../sports/entity/horario-deporte.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepo: Repository<Reserva>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,

    @InjectRepository(Deporte)
    private deporteRepo: Repository<Deporte>,

    @InjectRepository(Escenario)
    private escenarioRepo: Repository<Escenario>,

    @InjectRepository(HorarioDeporte)
    private horarioRepo: Repository<HorarioDeporte>,
  ) {}

  async crear(dto: CrearReservaDto, usuarioId: number): Promise<Reserva> {
    const usuario = await this.usuarioRepo.findOne({
      where: { id: usuarioId },
    });
    if (!usuario) throw new NotFoundException('Usuario no existe');

    const deporte = await this.deporteRepo.findOne({
      where: { id: dto.deporteId },
    });
    if (!deporte) throw new NotFoundException('Deporte no existe');

    const escenario = await this.escenarioRepo.findOne({
      where: { id: dto.escenarioId },
    });
    if (!escenario) throw new NotFoundException('Escenario no existe');

    if (dto.cantidadPersonas > escenario.capacidadMaxima) {
      throw new BadRequestException('Supera la capacidad del escenario');
    }

    const reservasExistentes = await this.reservaRepo.find({
      where: {
        fecha: dto.fecha,
        escenario: { id: dto.escenarioId },
      },
      relations: ['escenario'],
    });

    const hayTraslape = reservasExistentes.some((r) => {
      return dto.horaInicio < r.horaFin && dto.horaFin > r.horaInicio;
    });

    if (hayTraslape) {
      throw new ConflictException('Ya existe una reserva en ese horario');
    }

    const horarios = await this.horarioRepo.find({
      where: { deporte: { id: dto.deporteId } },
      relations: ['deporte'],
    });

    const horarioValido = horarios.some((h) => {
      return dto.horaInicio >= h.horaInicio && dto.horaFin <= h.horaFin;
    });

    if (!horarioValido) {
      throw new BadRequestException('Horario no permitido para este deporte');
    }

    const horaInicio = parseInt(dto.horaInicio.split(':')[0]);
    const horaFin = parseInt(dto.horaFin.split(':')[0]);

    const horas = horaFin - horaInicio;
    const total = horas * escenario.valorPorHora;

    const reserva = this.reservaRepo.create({
      ...dto,
      total,
      usuario,
      deporte,
      escenario,
    });

    return this.reservaRepo.save(reserva);
  }

  findAll(usuario: any) {
    if (usuario.role === 'admin') {
      return this.reservaRepo.find({
        relations: ['usuario', 'deporte', 'escenario'],
      });
    }

    return this.reservaRepo.find({
      where: { usuario: { id: usuario.userId } },
      relations: ['usuario', 'deporte', 'escenario'],
    });
  }
}