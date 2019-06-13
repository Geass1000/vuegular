import { AppService } from './app.service';
import * as Core from './core';

export class VueComponent {}

@Core.VueComponent({})
export class AppComponent extends VueComponent {
    private hi: string = `asd`;
    constructor (private appService: AppService) { super(); }

    public helloWorld () { ; }

    private pHelloWorld () { ; }
}
