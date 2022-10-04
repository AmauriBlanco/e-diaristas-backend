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
} from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { Repository } from 'typeorm';
import { Servico } from './entities/servico.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('admin/servicos')
export class ServicosController {
  constructor(
    private readonly servicosService: ServicosService,
    @InjectRepository(Servico)
    private readonly servicosRepository: Repository<Servico>,
  ) {}

  @Get('create')
  @Render('servicos/cadastrar')
  exibirCadstrar() {
    //
  }

  @Get('index')
  @Render('servicos/index')
  async listarServicos() {
    const servicos = await this.servicosRepository.find();
    return { servicos: servicos };
  }

  @Post()
  @Redirect('servicos/cadastrar')
  async cadastrar(@Body() createServicoDto: CreateServicoDto) {
    await this.servicosRepository.save(createServicoDto);
  }

  @Get(':id/edit')
  @Render('servicos/editar')
  async atualizarServico(@Param('id') id: number) {
    const servico = await this.servicosRepository.findOneBy({ id: id });
    return { servico: servico };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicoDto: UpdateServicoDto) {
    return this.servicosService.update(+id, updateServicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicosService.remove(+id);
  }
}
