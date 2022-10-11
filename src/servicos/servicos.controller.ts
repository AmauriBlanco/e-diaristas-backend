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

@Controller('admin/servicos')
export class ServicosController {
  constructor(
    private readonly servicosService: ServicosService,
    private readonly utils: Utils,
    @InjectRepository(Servico)
    private readonly servicosRepository: Repository<Servico>,
  ) {}

  @Get('create')
  @Render('servicos/cadastrar')
  exibirCadstrar(@Request() req) {
    return { message: req.flash('message'), oldData: req.flash('oldData') };
  }

  @Get('index')
  @Render('servicos/index')
  async listarServicos() {
    const servicos = await this.servicosRepository.find();
    return { servicos: servicos };
  }

  @Post()
  @UseFilters(CreateException)
  @Redirect('/admin/servicos/index')
  async cadastrar(@Body() createServicoDto: CreateServicoDto) {
    createServicoDto.valorBanheiro = this.utils.formatDecimal(
      createServicoDto.valorBanheiro,
    );
    createServicoDto.valorCozinha = this.utils.formatDecimal(
      createServicoDto.valorCozinha,
    );
    createServicoDto.valorOutros = this.utils.formatDecimal(
      createServicoDto.valorOutros,
    );
    createServicoDto.valorMinimo = this.utils.formatDecimal(
      createServicoDto.valorMinimo,
    );
    createServicoDto.valorQuarto = this.utils.formatDecimal(
      createServicoDto.valorQuarto,
    );
    createServicoDto.valorQuintal = this.utils.formatDecimal(
      createServicoDto.valorQuintal,
    );
    createServicoDto.valorSala = this.utils.formatDecimal(
      createServicoDto.valorSala,
    );

    return await this.servicosRepository.save(createServicoDto);
  }

  @Get(':id/edit')
  @Render('servicos/editar')
  async atualizarServico(@Param('id') id: number) {
    const servico = await this.servicosRepository.findOneBy({ id: id });
    return { servico: servico };
  }

  @Patch(':id/edit')
  @Redirect('/admin/servicos/index')
  async update(
    @Param('id') id: string,
    @Body() updateServicoDto: UpdateServicoDto,
  ) {
    updateServicoDto.valorBanheiro = this.utils.formatDecimal(
      updateServicoDto.valorBanheiro,
    );
    updateServicoDto.valorCozinha = this.utils.formatDecimal(
      updateServicoDto.valorCozinha,
    );
    updateServicoDto.valorOutros = this.utils.formatDecimal(
      updateServicoDto.valorOutros,
    );
    updateServicoDto.valorMinimo = this.utils.formatDecimal(
      updateServicoDto.valorMinimo,
    );
    updateServicoDto.valorQuarto = this.utils.formatDecimal(
      updateServicoDto.valorQuarto,
    );
    updateServicoDto.valorQuintal = this.utils.formatDecimal(
      updateServicoDto.valorQuintal,
    );
    updateServicoDto.valorSala = this.utils.formatDecimal(
      updateServicoDto.valorSala,
    );
    return await this.servicosRepository.update(id, updateServicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicosService.remove(+id);
  }
}
