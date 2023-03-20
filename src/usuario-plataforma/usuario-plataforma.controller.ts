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
  UseGuards,
} from '@nestjs/common';
import { UsuarioPlataformaService } from './usuario-plataforma.service';
import { CreateUsuarioPlataformaDto } from './dto/create-usuario-plataforma.dto';
import { UpdateUsuarioPlataformaDto } from './dto/update-usuario-plataforma.dto';
import { CreateException } from 'src/commom/filters/create-exceptions.filter';
import { PatchException } from 'src/commom/filters/patch-exceptions.filter';
import { AuthenticatedGuard } from 'src/commom/guards/authenticated.guard';
import { AuthException } from 'src/commom/filters/auth-exceptions.filters';

@Controller('admin/usuarios')
export class UsuarioPlataformaController {
  constructor(
    private readonly usuarioPlataformaService: UsuarioPlataformaService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthException)
  @Get('index')
  @Render('usuarios/index')
  async listarUsuarios(@Request() req) {
    return {
      usuarios: await this.usuarioPlataformaService.findAll(),
      csrfToken: req.csrfToken(),
    };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthException)
  @Get('create')
  @Render('usuarios/cadastrar')
  async exibirCadastrarUsuario(@Request() req) {
    return {
      message: req.flash('message'),
      oldData: req.flash('oldData'),
      alert: req.flash('alert'),
      csrfToken: req.csrfToken(),
    };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(CreateException)
  @Post()
  @Redirect('/admin/usuarios/index')
  create(@Body() createUsuarioPlataformaDto: CreateUsuarioPlataformaDto) {
    return this.usuarioPlataformaService.create(createUsuarioPlataformaDto);
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthException)
  @Get(':id/edit')
  @Render('usuarios/editar')
  async editarUsuario(@Param('id') id: number, @Request() req) {
    const user = await this.usuarioPlataformaService.findOne(id);
    return {
      usuario: user,
      message: req.flash('message'),
      oldData: req.flash('oldData'),
      alert: req.flash('alert'),
      csrfToken: req.csrfToken(),
    };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(PatchException)
  @Patch(':id/edit')
  @UseFilters(PatchException)
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

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthException)
  @Delete(':id')
  @Redirect('/admin/usuarios/index')
  remove(@Param('id') id: number) {
    return this.usuarioPlataformaService.remove(id);
  }
}
