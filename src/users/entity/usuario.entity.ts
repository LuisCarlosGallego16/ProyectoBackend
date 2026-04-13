import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Reserva } from '../../reservations/entity/reserva.entity';
import { Pago } from '../../payments/entity/pago.entity';

@Entity('users')
export class Usuario {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  telefono!: string;

  @Column({ default: 'user' })
  role!: string;

  // 2FA
  @Column({ default: false })
  is2FAEnabled!: boolean;

  @Column({ nullable: true })
  twoFASecret!: string;

  // Relaciones
  @OneToMany(() => Reserva, (reserva) => reserva.usuario)
  reservas!: Reserva[];

  @OneToMany(() => Pago, (pago) => pago.usuario)
  pagos!: Pago[];

  // Auditoría
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}