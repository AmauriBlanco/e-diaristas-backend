import { Module } from '@nestjs/common';
import { UsuarioPlataformaService } from './usuario-plataforma.service';
import { UsuarioPlataformaController } from './usuario-plataforma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioPlataforma } from './entities/usuario-plataforma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioPlataforma])],
  controllers: [UsuarioPlataformaController],
  providers: [UsuarioPlataformaService],
})
export class UsuarioPlataformaModule {}
