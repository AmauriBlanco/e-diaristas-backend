import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/commom/mail/mail.service';
import { UsuarioPlataforma } from 'src/usuario-plataforma/entities/usuario-plataforma.entity';
import { PasswordReset } from './entities/password-reset.entity';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordReset, UsuarioPlataforma])],
  controllers: [PasswordResetController],
  providers: [MailService, PasswordResetService],
})
export class PasswordResetModule {}
