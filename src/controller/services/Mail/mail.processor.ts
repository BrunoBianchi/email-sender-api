import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";
import { transporterCache } from "../Cache/transporter-cache";
@Processor('mail')
export class mailProcessor {
  @Process('mail-gmail')
  async handler(job: Job) {
    const { accessToken, email, subject, html } = job.data;

    const transporter = transporterCache.getCache(accessToken);
    transporter.sendMail({
      from: "bruno2002.raiado@gmail.com",
      to: email,
      subject: subject,
      html: html
    })

  }
}