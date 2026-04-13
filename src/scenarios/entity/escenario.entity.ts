import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Reserva } from '../../reservations/entity/reserva.entity';

@Entity('escenarios')
export class Escenario {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  ubicacion!: string;

  @Column()
  capacidadMaxima!: number;

  @Column('decimal')
  valorPorHora!: number;

  //Relación en la base de datos con las otras entidades
  @OneToMany(() => Reserva, (reserva) => reserva.escenario)
  reservas!: Reserva[];
}