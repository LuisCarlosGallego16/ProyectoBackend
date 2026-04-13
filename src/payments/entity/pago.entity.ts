import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Reserva } from '../../reservations/entity/reserva.entity';
import { Usuario } from '../../users/entity/usuario.entity';

@Entity('pagos')
export class Pago {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  monto!: number;

  @Column()
  estado!: string; // aprobado, rechazado, pendiente

  @Column()
  metodo!: string; // simulado

  @Column()
  transaccionId!: string;

  @CreateDateColumn()
  fecha!: Date;

  // 🔗 Relaciones
  @ManyToOne(() => Reserva, (reserva) => reserva.id)
  reserva!: Reserva;

  @ManyToOne(() => Usuario, (usuario) => usuario.pagos)
  usuario!: Usuario;
}