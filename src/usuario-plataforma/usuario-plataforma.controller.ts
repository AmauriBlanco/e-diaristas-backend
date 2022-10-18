import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { UsuarioPlataformaService } from './usuario-plataforma.service';
import { CreateUsuarioPlataformaDto } from './dto/create-usuario-plataforma.dto';
import { UpdateUsuarioPlataformaDto } from './dto/update-usuario-plataforma.dto';

@Controller('admin/usuarios')
export class UsuarioPlataformaController {
  constructor(
    private readonly usuarioPlataformaService: UsuarioPlataformaService,
  ) {}

  @Get('index')
  @Render('usuarios/index')
  async listarUsuarios() {
    return { nome: 'Amauri', email: 'amauri@treinaweb.com', id: '1' };
  }

  @Post()
  create(@Body() createUsuarioPlataformaDto: CreateUsuarioPlataformaDto) {
    return this.usuarioPlataformaService.create(createUsuarioPlataformaDto);
  }

  @Get()
  findAll() {
    return this.usuarioPlataformaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioPlataformaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsuarioPlataformaDto: UpdateUsuarioPlataformaDto,
  ) {
    return this.usuarioPlataformaService.update(
      +id,
      updateUsuarioPlataformaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioPlataformaService.remove(+id);
  }
}
