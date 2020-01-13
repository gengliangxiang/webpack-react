import { Controller, Get, Post, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/mine')
  @HttpCode(200)
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/mine')
  @HttpCode(200)
  post(): string {
    return this.appService.getHello();
  }
}
