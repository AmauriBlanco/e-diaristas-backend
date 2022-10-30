/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Render,
  Redirect,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { CreateException } from 'src/common/filters/create-exceptions.filter';
import { PatchException } from 'src/common/filters/patch-exceptions.filter';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { AuthException } from 'src/common/filters/auth-exeptions.filters';

@Controller('admin/servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthException)
  @Get('create')
  @Render('servicos/cadastrar')
  exibirCadstrar(@Request() req) {
    return {
      message: req.flash('message'),
      oldData: req.flash('oldData'),
      alert: req.flash('alert'),
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
      servico: await this.servicosService.findOne(id),
      message: req.flash('message'),
      oldData: req.flash('oldData'),
      alert: req.flash('alert'),
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
