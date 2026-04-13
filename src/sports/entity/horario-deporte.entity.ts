import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Deporte } from './deporte.entity';

@Entity('horarios_deporte')
export class HorarioDeporte {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  horaInicio!: string;

  @Column()
  horaFin!: string;

  // Relación con deporte
  @ManyToOne(() => Deporte, (deporte) => deporte.horarios, {
    onDelete: 'CASCADE',
  })
  deporte!: Deporte;
}