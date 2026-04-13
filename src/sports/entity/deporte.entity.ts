import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { HorarioDeporte } from './horario-deporte.entity';
import { Reserva } from '../../reservations/entity/reserva.entity';

@Entity('deportes')
export class Deporte {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  // Relación con horarios
  @OneToMany(() => Reserva, (reserva) => reserva.deporte)
  reservas!: Reserva[];

  @OneToMany(() => HorarioDeporte, (horario) => horario.deporte)
  horarios!: HorarioDeporte[];
}