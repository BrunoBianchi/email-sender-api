import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { mailProcessor } from './mail.processor';
import { JWTServices } from '../jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import envoriments from 'src/env/envoriments';
@Module({
  imports: [
  BullModule.registerQueue({
    name:'mail'
  }),
  JwtModule.register({ secret: envoriments.secret  })

],
  controllers: [MailController],
  providers: [MailService,mailProcessor,JWTServices],
})
export class MailModule { }
