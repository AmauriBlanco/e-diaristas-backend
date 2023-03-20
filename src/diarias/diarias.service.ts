import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import DiariaStatus from './diaria-status.enum';
import { DiariasRepository } from './diarias.repository';
import { GetDiariasFilterDto } from './dto/get-diarias-filter.dto';
import { Diaria } from './entities/diaria.entity';

@Injectable()
export class DiariasService {
  constructor(private diariaRepository: DiariasRepository) {}
  async findAll() {
    return await this.diariaRepository.repository.listarDiarias();
  }

  async pagar(id: number) {
    const diaria = await this.buscarDiariaPorId(id);
    this.validarDiariaPagamento(diaria);
    diaria.status = DiariaStatus.TRANSFERIDO;
    await this.diariaRepository.repository.save(diaria);
  }

  async getDiariasFilters(filterDto: GetDiariasFilterDto) {
    const { status, cliente } = filterDto;
    let diarias = await this.findAll();

    if (status) {
      diarias = diarias.filter((diaria) => {
        if (status.toString().indexOf(diaria.status.toString()) >= 0) {
          return true;
        }
        return false;
      });
    }

    if (cliente) {
      diarias = diarias.filter(
        (diaria) => diaria.cliente.nomeCompleto == cliente,
      );
    }

    return diarias;
  }

  private validarDiariaPagamento(diaria: Diaria) {
    if (
      diaria.status === DiariaStatus.CONCLUIDO ||
      diaria.status === DiariaStatus.AVALIADO
    ) {
      return diaria;
    }
    return new BadRequestException('Diária com status inválido para pagamento');
  }

  private async buscarDiariaPorId(id: number) {
    const diaria = await this.diariaRepository.repository.findOneBy({ id: id });
    if (!diaria) {
      throw new NotFoundException();
    }
    return diaria;
  }
}
