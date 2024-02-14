import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MailModule } from './controller/services/Mail/mail.module';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
