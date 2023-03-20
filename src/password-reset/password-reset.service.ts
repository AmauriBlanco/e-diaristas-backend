import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { MailService } from 'src/commom/mail/mail.service';
import { UsuarioPlataforma } from 'src/usuario-plataforma/entities/usuario-plataforma.entity';
import { Repository } from 'typeorm';
import { PasswordResetConfirmacaoDto } from './dto/password-reset-confirmacao.dto';
import { PasswordReset } from './entities/password-reset.entity';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordReset)
    private passwordRepository: Repository<PasswordReset>,
    @InjectRepository(UsuarioPlataforma)
    private usuarioRepository: Repository<UsuarioPlataforma>,
    private mailService: MailService,
  ) {}

  async criarPasswordReset(email: string) {
    const passwordReset = new PasswordReset();
    if (await this.usuarioRepository.findOneBy({ email: email })) {
      passwordReset.email = email;
      passwordReset.token = randomUUID();
      await this.passwordRepository.save(passwordReset);
    }
    if (passwordReset.email) {
      await this.mailService.enviarEmailDeResetDeSenha(passwordReset);
    }
    return null;
  }

  async resetarSenha(passwordResetToken: string, novaSenha: string) {
    const passwordReset = await this.buscarPasswordResetPorToken(
      passwordResetToken,
    );

    const usuario = await this.usuarioRepository.findOneBy({
      email: passwordReset.email,
    });

    await usuario.setPassword(novaSenha);
    await this.usuarioRepository.save(usuario);
    await this.passwordRepository.delete(passwordReset);
  }

  private async buscarPasswordResetPorToken(passwordResetToken: string) {
    const passwordReset = await this.passwordRepository.findOneBy({
      token: passwordResetToken,
    });

    if (!passwordReset) {
      throw new NotFoundException('Token não encontrado');
    }

    return passwordReset;
  }

  async confirmarResetSenha(request: PasswordResetConfirmacaoDto) {
    await this.validarConfirmacaoSenha(request);
    await this.resetarSenha(request.token, request.password);

    return { mensagem: 'Senha alterada com sucesso' };
  }

  private async validarConfirmacaoSenha(request: PasswordResetConfirmacaoDto) {
    const senha = request.password;
    const confirmacaoSenha = request.passwordConfirmation;

    if (senha != confirmacaoSenha) {
      throw new BadRequestException('Senhas não conferem');
    }
  }
}
