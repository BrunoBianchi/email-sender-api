import { Body, Controller, Headers, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { transporterCache } from '../Cache/transporter-cache';
import { z } from "zod";
import { JWTServices } from '../jwt/jwt.service';
@Controller('api/v1/mail')
export class MailController {
  constructor(@InjectQueue('mail') private queue: Queue, private jwt: JWTServices) { }

  @Post('send-gmail')
  async transcode(@Body() body, @Headers() headers) {

    const { email, subject, html } = z.object({
      email: z.string(),
      subject: z.string(),
      html: z.string()
    }).parse(body);

    const { token } = z.object({
      token: z.string()
    }).parse(headers);

    const jwtToken = await this.jwt.decrypt(token)
    if (!jwtToken.payload) throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    
    const { accessToken, refreshToken } = jwtToken.payload;
    transporterCache.setCache(accessToken, refreshToken);

    const job = await this.queue.add('mail-gmail',
      {
        email,
        subject,
        html,
        accessToken,
      }
    );
    return { status: 200, message: `Api sent request with job id: ${job.id}` }


  }
}
