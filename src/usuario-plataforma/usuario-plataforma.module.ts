import { Module } from '@nestjs/common';
import { UsuarioPlataformaService } from './usuario-plataforma.service';
import { UsuarioPlataformaController } from './usuario-plataforma.controller';

@Module({
  controllers: [UsuarioPlataformaController],
  providers: [UsuarioPlataformaService]
})
export class UsuarioPlataformaModule {}
