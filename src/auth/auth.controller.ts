import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroDto } from './dto/registro.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // REGISTRO
  @Post('registro')
  register(@Body() body: RegistroDto) {
    return this.authService.registrar(body);
  }

  // LOGIN 
  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }

  // VERIFICAR 2FA
  @Post('verify-2fa')
  verificar(@Body() body: any) {
    return this.authService.verificarCodigo(
      body.email,
      body.codigo,
    );
  }
}