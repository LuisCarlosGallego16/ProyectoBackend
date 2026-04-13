import { IsEmail, IsString, MinLength } from 'class-validator';


// Aquí definimos qué datos debe enviar alguien al registrarse
export class RegistroDto {

  @IsString()
  nombre!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsString()
  telefono!: string;
}