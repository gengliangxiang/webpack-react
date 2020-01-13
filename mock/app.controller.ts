import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/mine')
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/mine')
  post(): string {
    return this.appService.getHello();
  }
}
