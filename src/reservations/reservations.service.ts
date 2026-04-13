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
  // Inyección de los repositorios necesarios para gestionar reservas y validar relaciones
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

  // Crea una nueva reserva validando usuario, deporte, escenario, horario y capacidad
  async crear(dto: CrearReservaDto, usuarioId: number): Promise<Reserva> {
    // Busca el usuario que está realizando la reserva
    const usuario = await this.usuarioRepo.findOne({
      where: { id: usuarioId },
    });

    // Si el usuario no existe, lanza una excepción
    if (!usuario) throw new NotFoundException('Usuario no existe');

    // Busca el deporte asociado a la reserva
    const deporte = await this.deporteRepo.findOne({
      where: { id: dto.deporteId },
    });

    // Si el deporte no existe, lanza una excepción
    if (!deporte) throw new NotFoundException('Deporte no existe');

    // Busca el escenario seleccionado para la reserva
    const escenario = await this.escenarioRepo.findOne({
      where: { id: dto.escenarioId },
    });

    // Si el escenario no existe, lanza una excepción
    if (!escenario) throw new NotFoundException('Escenario no existe');

    // Valida que la cantidad de personas no supere la capacidad máxima del escenario
    if (dto.cantidadPersonas > escenario.capacidadMaxima) {
      throw new BadRequestException('Supera la capacidad del escenario');
    }

    // Busca reservas existentes en la misma fecha y escenario
    const reservasExistentes = await this.reservaRepo.find({
      where: {
        fecha: dto.fecha,
        escenario: { id: dto.escenarioId },
      },
      relations: ['escenario'],
    });

    // Verifica si el horario solicitado se cruza con otra reserva ya existente
    const hayTraslape = reservasExistentes.some((r) => {
      return dto.horaInicio < r.horaFin && dto.horaFin > r.horaInicio;
    });

    // Si existe cruce de horarios, lanza una excepción
    if (hayTraslape) {
      throw new ConflictException('Ya existe una reserva en ese horario');
    }

    // Obtiene los horarios permitidos para el deporte seleccionado
    const horarios = await this.horarioRepo.find({
      where: { deporte: { id: dto.deporteId } },
      relations: ['deporte'],
    });

    // Verifica que la hora de la reserva esté dentro de un horario válido del deporte
    const horarioValido = horarios.some((h) => {
      return dto.horaInicio >= h.horaInicio && dto.horaFin <= h.horaFin;
    });

    // Si el horario no está permitido para ese deporte, lanza una excepción
    if (!horarioValido) {
      throw new BadRequestException('Horario no permitido para este deporte');
    }

    // Extrae la hora inicial y final para calcular la duración de la reserva
    const horaInicio = parseInt(dto.horaInicio.split(':')[0]);
    const horaFin = parseInt(dto.horaFin.split(':')[0]);

    // Calcula la cantidad de horas reservadas
    const horas = horaFin - horaInicio;

    // Calcula el valor total de la reserva según el precio por hora del escenario
    const total = horas * escenario.valorPorHora;

    // Crea la nueva reserva con sus relaciones y el total calculado
    const reserva = this.reservaRepo.create({
      ...dto,
      total,
      usuario,
      deporte,
      escenario,
    });

    // Guarda la reserva en la base de datos
    return this.reservaRepo.save(reserva);
  }

  // Obtiene las reservas según el rol del usuario autenticado
  findAll(usuario: any) {
    // Si el usuario es administrador, puede ver todas las reservas
    if (usuario.role === 'admin') {
      return this.reservaRepo.find({
        relations: ['usuario', 'deporte', 'escenario'],
      });
    }

    // Si es un usuario normal, solo puede ver sus propias reservas
    return this.reservaRepo.find({
      where: { usuario: { id: usuario.userId } },
      relations: ['usuario', 'deporte', 'escenario'],
    });
  }
}