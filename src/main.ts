import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as methodOverrride from 'method-override';
import * as exphbs from 'express-handlebars';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const viewPath = join(__dirname, '..', 'views');
  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(viewPath);
  app.setViewEngine('hbs');
  app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main' }));

  app.use(methodOverrride('_method'));

  await app.listen(3000);
}
bootstrap();
