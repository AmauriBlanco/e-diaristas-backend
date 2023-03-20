import { Module } from '@nestjs/common';
import { DiariasService } from './diarias.service';
import { DiariasController } from './diarias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diaria } from './entities/diaria.entity';
import { DiariasRepository } from './diarias.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Diaria])],
  controllers: [DiariasController],
  providers: [DiariasService, DiariasRepository],
})
export class DiariasModule {}
