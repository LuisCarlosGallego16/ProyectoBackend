import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // LOGIN (FASE 1)
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