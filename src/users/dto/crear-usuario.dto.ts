import { IsEmail, IsString, MinLength } from 'class-validator';

export class CrearUsuarioDto {

  @IsString()
  nombre!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsString()
  telefono!: string;
}