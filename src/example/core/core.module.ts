import { AuthModule } from './auth/auth.module';
import { HttpService } from './http.service';
import { LoggerService } from './logger.service';
import * as Vuegular from '../../core';

@Vuegular.VgModule({
    modules: [ AuthModule ],
    providers: [ LoggerService, HttpService ],
    components: [],
})
export class CoreModule {}