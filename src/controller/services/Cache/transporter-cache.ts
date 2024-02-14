type cache = Array<Record<string, string>>
import { MailService } from "../Mail/mail.service";
class TransporterCache {
    private cache: cache = []
    private mail = new MailService();
    public setCache(accessToken: string, refreshToken: string) {
        if (!this.cache[accessToken]) {
            this.cache[accessToken] = this.mail.getTrasnporter(accessToken, refreshToken);
        }
    }
    public getCache(accessToken:string) {
        return this.cache[accessToken]
    }
}
const cache = new TransporterCache();
export const transporterCache = cache;