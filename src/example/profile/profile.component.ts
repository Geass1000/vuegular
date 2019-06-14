import { LoggerService } from './../core/logger.service';
import { HttpService } from './../core/http.service';
import * as Vuegular from '../../core';


export class VueComponent {}

@Vuegular.VgComponent({
    providers: [ LoggerService ],
})
export class ProfileComponent extends VueComponent {
    constructor (
        private logger: LoggerService,
        private http: HttpService) { super(); }

    public helloWorld () { ; }

    private pHelloWorld () { ; }
}
