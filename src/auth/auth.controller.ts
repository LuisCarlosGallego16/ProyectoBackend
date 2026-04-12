import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(private servicioAuth: AuthService) {}

  @Post('registro')
  registrar(@Body() datos: RegistroDto) {
    return this.servicioAuth.registrar(datos);
  }

  @Post('login')
  iniciarSesion(@Body() datos: LoginDto) {
    return this.servicioAuth.iniciarSesion(datos);
  }
}