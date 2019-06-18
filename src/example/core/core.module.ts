import { AuthModule } from './auth/auth.module';
import { HttpService } from './http.service';
import { LoggerService } from './logger.service';
import * as Vuegular from '../../core';

@Vuegular.VgGlobalModule({
    modules: [ AuthModule ],
    providers: [ LoggerService, HttpService ],
})
export class CoreModule {}