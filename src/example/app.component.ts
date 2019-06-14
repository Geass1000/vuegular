import { LoggerService } from './core/logger.service';
import { AppService } from './app.service';
import * as Vuegular from '../core';

import { paramTest } from '../decorators';

export class VueComponent {}

@Vuegular.VgComponent({
    providers: [ LoggerService ]
})
export class AppComponent extends VueComponent {
    private hi: string = `asd`;
    constructor (
        // @Vuegular.VgInject(`Hello!`) private hello: string, 
        private logger: LoggerService,
        private appService: AppService) { super(); }

    public helloWorld () { ; }

    private pHelloWorld () { ; }
}
