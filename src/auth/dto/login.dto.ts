import { IsEmail, IsString } from 'class-validator';


// Este se usa para definir la estructura de los datos que llegan en el login
export class LoginDto {

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}