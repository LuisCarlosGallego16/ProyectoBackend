import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  correo: string;

  @Column()
  contrasena: string;
}