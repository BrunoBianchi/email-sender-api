import { Injectable, Options } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JWTServices {
    constructor(private jwtModule: JwtService) { }
    public async decrypt(jwt: string) {
        try {
            const jwttoken = await this.jwtModule.verifyAsync(jwt);
            return jwttoken
        } catch (err) {
          return Error(err);
        }
    }
}
