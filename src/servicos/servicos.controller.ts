/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
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
} from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { Repository } from 'typeorm';
import { Servico } from './entities/servico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Utils } from 'src/utils/utils';
import { CreateException } from 'src/common/filters/create-exceptions.filter';
import { PatchException } from 'src/common/filters/patch-exceptions.filter';

@Controller('admin/servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Get('create')
  @Render('servicos/cadastrar')
  exibirCadstrar(@Request() req) {
    return {
      message: req.flash('message'),
      oldData: req.flash('oldData'),
      alert: req.flash('alert'),
    };
  }

  @Get('index')
  @Render('servicos/index')
  async listarServicos() {
    return { servicos: await this.servicosService.findAll() };
  }

  @Post()
  @UseFilters(CreateException)
  @Redirect('/admin/servicos/index')
  async cadastrar(@Body() createServicoDto: CreateServicoDto) {
    return await this.servicosService.create(createServicoDto);
  }

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

  @Patch(':id/edit')
  @UseFilters(PatchException)
  @Redirect('/admin/servicos/index')
  async update(
    @Param('id') id: number,
    @Body() updateServicoDto: UpdateServicoDto,
  ) {
    return await this.servicosService.update(id, updateServicoDto);
  }
}
