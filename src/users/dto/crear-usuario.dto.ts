import { IsEmail, IsString, MinLength } from 'class-validator';


// DTO utilizado para validar los datos al crear un usuario, que tengan el formato establecido
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