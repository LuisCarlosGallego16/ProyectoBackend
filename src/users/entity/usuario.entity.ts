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

// Entidad que representa la tabla de usuarios en la base de datos
@Entity('users')
export class Usuario {
  // Llave primaria autoincremental del usuario
  @PrimaryGeneratedColumn()
  id!: number;

  // Nombre del usuario
  @Column()
  nombre!: string;

  // Correo electrónico único para cada usuario
  @Column({ unique: true })
  email!: string;

  // Contraseña del usuario
  @Column()
  password!: string;

  // Número de teléfono del usuario
  @Column({ nullable: true })
  telefono!: string;

  // Rol del usuario dentro del sistema
  @Column({ default: 'user' })
  role!: string;

  // Indica si el usuario tiene activado el doble factor de autenticación
  @Column({ default: false })
  is2FAEnabled!: boolean;

  // Guarda el secreto usado para la autenticación en dos pasos
  @Column({ nullable: true })
  twoFASecret!: string;

  // Relación de un usuario con muchas reservas
  @OneToMany(() => Reserva, (reserva) => reserva.usuario)
  reservas!: Reserva[];

  // Relación de un usuario con muchos pagos
  @OneToMany(() => Pago, (pago) => pago.usuario)
  pagos!: Pago[];

  // Fecha de creación automática del registro
  @CreateDateColumn()
  createdAt!: Date;

  // Fecha de actualización automática del registro
  @UpdateDateColumn()
  updatedAt!: Date;
}