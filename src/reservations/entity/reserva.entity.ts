import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Usuario } from '../../users/entity/usuario.entity';
import { Deporte } from '../../sports/entity/deporte.entity';
import { Escenario } from '../../scenarios/entity/escenario.entity';

// Entidad que representa una reserva en la base de datos
@Entity('reservas')
export class Reserva {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fecha!: string;

  @Column()
  horaInicio!: string;

  @Column()
  horaFin!: string;

  @Column()
  cantidadPersonas!: number;

  @Column({ default: 'activa' })
  estado!: string;

  @Column()
  total!: number;

  // Relaciones en la base de datos con otras entidades
  @ManyToOne(() => Usuario, (usuario) => usuario.reservas)
  usuario!: Usuario;

  @ManyToOne(() => Deporte, (deporte) => deporte.reservas)
  deporte!: Deporte;

  @ManyToOne(() => Escenario, (escenario) => escenario.reservas)
  escenario!: Escenario;
}