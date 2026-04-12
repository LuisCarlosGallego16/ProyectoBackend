import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuardia } from './guardias/jwt.guardia';

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

  // ruta protegida
  @UseGuards(JwtGuardia)
  @Get('perfil')
  obtenerPerfil(@Req() req) {
    return req.user;
  }
}