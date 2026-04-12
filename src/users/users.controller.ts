import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';

@Controller('usuarios')
export class UsersController {

  constructor(private servicioUsuarios: UsersService) {}

  @Post()
  crear(@Body() datos: CrearUsuarioDto) {
    return this.servicioUsuarios.crear(datos);
  }

  @Get()
  obtenerTodos() {
    return this.servicioUsuarios.buscarTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.servicioUsuarios.buscarPorId(Number(id));
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.servicioUsuarios.eliminar(Number(id));
  }
}