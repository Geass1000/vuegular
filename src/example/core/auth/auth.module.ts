import { AuthService } from './auth.service';

import * as Vuegular from '../../../core';

@Vuegular.VgModule({
    modules: [],
    providers: [ AuthService ],
})
export class AuthModule {}