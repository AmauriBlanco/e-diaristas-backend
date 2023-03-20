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
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { Repository } from 'typeorm';
import { Servico } from './entities/servico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Utils } from 'src/utils/utils';
import { CreateException } from 'src/commom/filters/create-exceptions.filter';
import { PatchException } from 'src/commom/filters/patch-exceptions.filter';
import { AuthenticatedGuard } from 'src/commom/guards/authenticated.guard';
import { AuthException } from 'src/commom/filters/auth-exceptions.filters';

@Controller('admin/servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthException)
  @Get('create')
  @Render('servicos/cadastrar')
  exibirCadastrar(@Request() req) {
    return {
      message: req.flash('message'),
      oldData: req.flash('oldData'),
      alert: req.flash('alert'),
      csrfToken: req.csrfToken(),
    };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthException)
  @Get('index')
  @Render('servicos/index')
  async listarServicos() {
    return { servicos: await this.servicosService.findAll() };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(CreateException)
  @Post()
  @Redirect('/admin/servicos/index')
  async cadastrar(@Body() createServicoDto: CreateServicoDto) {
    return await this.servicosService.create(createServicoDto);
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthException)
  @Get(':id/edit')
  @Render('servicos/editar')
  async atualizarServico(@Param('id') id: number, @Request() req) {
    return {
      message: req.flash('message'),
      oldData: req.flash('oldData'),
      alert: req.flash('alert'),
      servico: await this.servicosService.findOne(id),
      csrfToken: req.csrfToken(),
    };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(PatchException)
  @Patch(':id/edit')
  @Redirect('/admin/servicos/index')
  async update(
    @Param('id') id: number,
    @Body() updateServicoDto: UpdateServicoDto,
  ) {
    return await this.servicosService.update(id, updateServicoDto);
  }
}
