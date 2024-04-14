import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DSAService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DSAService],
})
export class AppModule { }
