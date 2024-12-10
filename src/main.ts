import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // allow browser/client to access js, css, images
  app.useStaticAssets(join(__dirname, '../src/', 'public'));
  // allow browser/client to access views folder
  app.setBaseViewsDir(join(__dirname, '../src/', 'views'));
  // set view engine (hbs, ejs, pug...)
  app.setViewEngine('ejs');
  // validation class
  app.useGlobalPipes(new ValidationPipe())
  // cors config
  app.enableCors({
    origin: "",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
  });
  await app.listen(configService.get<string>("PORT"));
}
bootstrap();

// mongodb+srv://thuyphuocthinh:09122003@cluster.ltftnvr.mongodb.net/