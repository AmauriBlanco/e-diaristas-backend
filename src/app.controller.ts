import {
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Request,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { AuthException } from './commom/filters/auth-exceptions.filters';
import { LoginGuard } from './commom/guards/login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('admin/login')
  redirect() {
    //redirect to login
  }

  @Get('admin/login')
  @Render('login')
  getLogin(@Request() req) {
    return {
      layout: false,
      loginError: req.flash('loginError'),
      class: req.flash('class'),
      csrfToken: req.csrfToken(),
    };
  }

  @UseGuards(LoginGuard)
  @UseFilters(AuthException)
  @Post('admin/login')
  @Redirect('/admin/usuarios/index')
  doLogin() {
    //
  }

  @UseFilters(AuthException)
  @Post('admin/logout')
  logout(@Request() req, @Res() res: Response) {
    req.session.destroy();
    res.redirect('/admin/login');
  }

  @Get('admin/404')
  @Render('404')
  notFound() {
    return { layout: false };
  }

  @Get('admin/500')
  @Render('500')
  errorServer() {
    return { layout: false };
  }
}
