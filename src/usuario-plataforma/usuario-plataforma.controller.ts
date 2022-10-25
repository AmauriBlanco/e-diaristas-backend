import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Redirect,
  UseFilters,
  Request,
} from '@nestjs/common';
import { UsuarioPlataformaService } from './usuario-plataforma.service';
import { CreateUsuarioPlataformaDto } from './dto/create-usuario-plataforma.dto';
import { UpdateUsuarioPlataformaDto } from './dto/update-usuario-plataforma.dto';
import { CreateException } from 'src/common/filters/create-exceptions.filter';

@Controller('admin/usuarios')
export class UsuarioPlataformaController {
  constructor(
    private readonly usuarioPlataformaService: UsuarioPlataformaService,
  ) {}

  @Get('index')
  @Render('usuarios/index')
  async listarUsuarios() {
    return { usuarios: await this.usuarioPlataformaService.findAll() };
  }

  @Get('create')
  @Render('usuarios/cadastrar')
  async exibirCadastrarUsuario(@Request() req) {
    return {
      message: req.flash('message'),
      oldData: req.flash('oldData'),
      alert: req.flash('alert'),
    };
  }

  @Post()
  @UseFilters(CreateException)
  @Redirect('/admin/usuarios/index')
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

  @Get(':id/edit')
  @Render('usuarios/edit')
  editarUsuario(@Param('id') id: number) {
    //;
  }

  @Patch(':id/edit')
  @Redirect('/admin/usuarios/index')
  async update(
    @Param('id') id: number,
    @Body() updateUsuarioPlataformaDto: UpdateUsuarioPlataformaDto,
  ) {
    return await this.usuarioPlataformaService.update(
      id,
      updateUsuarioPlataformaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioPlataformaService.remove(+id);
  }
}
