import { Module } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { ServicosController } from './servicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servico } from './entities/servico.entity';
import { Utils } from 'src/utils/utils';

@Module({
  imports: [TypeOrmModule.forFeature([Servico])],
  controllers: [ServicosController],
  providers: [ServicosService, Utils],
})
export class ServicosModule {}
