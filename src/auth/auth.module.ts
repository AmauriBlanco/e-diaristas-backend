import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioPlataforma } from 'src/usuario-plataforma/entities/usuario-plataforma.entity';
import { UsuarioPlataformaService } from 'src/usuario-plataforma/usuario-plataforma.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioPlataforma])],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
    UsuarioPlataformaService,
  ],
})
export class AuthModule {}
