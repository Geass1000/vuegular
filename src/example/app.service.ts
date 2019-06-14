import { LoggerService } from './core/logger.service';
import * as Vuegular from '../core';

@Vuegular.VgService()
export class AppService {

    constructor(private logger: LoggerService) { ; }
}

