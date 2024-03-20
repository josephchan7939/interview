import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request as Reqst, Response as Respon} from 'express';

@Injectable()
export class AccessLogMiddleware implements NestMiddleware {
    private logger = new Logger('AccessLogMiddleware');

    use(req: Reqst, res: Respon, next: () => void) {
        this.logger.log(`Request received: ${req.method} ${req.baseUrl},come from ${req.ip}`);
        next();
    }
}