import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  handleLogin(@Request() req) {
    return req.user;
  }
}
