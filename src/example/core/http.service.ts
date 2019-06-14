import { LoggerService } from './logger.service';
import * as Vuegular from '../../core';

@Vuegular.VgService({
    providers: [ LoggerService ],
})
export class HttpService {
}

