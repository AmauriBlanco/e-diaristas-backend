import {
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './common/guards/login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('admin/login')
  @Render('login')
  getLogin() {
    return {
      layout: false,
    };
  }

  @UseGuards(LoginGuard)
  @Post('/admin/login')
  @Redirect('/admin/usuarios/index')
  doLogin() {
    //
  }
}
