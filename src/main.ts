import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as methodOverride from 'method-override';
import * as exphbs from 'express-handlebars';
import * as session from 'express-session';
import flash = require('connect-flash');
import { AppModule } from './app.module';
import * as passport from 'passport';
import { Helpers } from './commom/utils/helpers';
import { Request } from 'express';
import * as express from 'express';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const exp = express();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const viewPath = join(__dirname, '..', 'views');
  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(viewPath);

  app.use((req: Request, res, next) => {
    exp.locals.expreq = req;
    next();
  });

  app.setViewEngine('hbs');

  const handlebars = new Helpers();
  const helpers = await handlebars.helperHbs(exp);
  app.engine(
    'hbs',
    exphbs.engine({ extname: 'hbs', defaultLayout: 'main', helpers }),
  );

  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride('_method'));
  app.use(cookieParser());

  app.use(
    session({
      secret: 'nest-treinaweb',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(csrf());
  app.use(flash());
  await app.listen(3000);
}
bootstrap();
