import { Controller, Get } from '@nestjs/common';
import { DSAService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: DSAService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
