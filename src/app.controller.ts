import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('content/:idContent')
  getContent(
    @Param() idContent: number
  ): string {
    return this.appService.getContent(idContent);
  }
}

