import { AppService } from './app.service';
import * as Vuegular from './core';

export class VueComponent {}

@Vuegular.VueComponent({})
export class AppComponent extends VueComponent {
    private hi: string = `asd`;
    constructor (private appService: AppService) { super(); }

    public helloWorld () { ; }

    private pHelloWorld () { ; }
}
