import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {

  getTrasnporter(accessToken: string, refreshToken: string) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "bruno2002.raiado@gmail.com",
        clientId: "789255858522-uqd2cbipk6cn4opvm45u8iepnv7tu10h.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: refreshToken,
        accessToken: accessToken,
        expires: 1484314697598,
      },
    })
    return transporter;

  }
}
