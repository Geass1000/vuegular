import { VuegularHelper } from '../vuegular.helper';
import * as Interfaces from '../interfaces';

export function VueModule (config: Interfaces.VueModule) {
    return <T extends {new(...args:any[]):{}}> (Module: T) => {
        VuegularHelper.setElementConfig(config, Module);

        console.log(Module);
    };
}
