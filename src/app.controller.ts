import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {}

  @Post("/login")
  @UseGuards(LocalAuthGuard)
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get("/profile")
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
