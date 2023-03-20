import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
  Request,
} from '@nestjs/common';
import { PasswordResetConfirmacaoDto } from './dto/password-reset-confirmacao.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { PasswordResetService } from './password-reset.service';

@Controller('admin')
export class PasswordResetController {
  constructor(private passwordResetService: PasswordResetService) {}

  @Get('password-reset')
  @Render('resetar-senha')
  telaReset() {
    return { layout: false };
  }

  @Post('password-reset')
  @Redirect('/admin/login')
  async solicitarPasswordReset(@Body() passwordResetDto: PasswordResetDto) {
    await this.passwordResetService.criarPasswordReset(passwordResetDto.email);
    return { layout: false };
  }

  @Get('confirmacao')
  @Render('confirmacao')
  telaConfirmar(@Query('token') token: string, @Request() req) {
    return { layout: false, tokenPassword: token, csrfToken: req.csrfToken() };
  }

  @Post('confirmacao')
  @Redirect('/admin/login')
  async resetarSenha(
    @Body() passwordResetConfirmacaoDto: PasswordResetConfirmacaoDto,
  ) {
    await this.passwordResetService.confirmarResetSenha(
      passwordResetConfirmacaoDto,
    );
    return { layout: false };
  }
}
