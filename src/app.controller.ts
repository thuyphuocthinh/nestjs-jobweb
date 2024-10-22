import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService) {}

  @Get()
  @Render("home")
  getHelloPage(): {message: string} {
    // return this.appService.getHello();
    console.log(">> check port = ", this.configService.get<string>("PORT"));
    return {
      message: "Message from service"
    }
  }

  @Get("/user")
  @Render("user")
  getUserPage() {
    // return this.appService.getHello();
  }
}
