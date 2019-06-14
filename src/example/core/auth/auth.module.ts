import { AuthService } from './auth.service';

import * as Vuegular from '../../../core';

@Vuegular.VgModule({
    modules: [],
    providers: [ AuthService ],
    components: [],
})
export class AuthModule {}