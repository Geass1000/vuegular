import { VgHelper } from '../vg.helper';
import * as Interfaces from '../interfaces';

export function VgModule (config: Interfaces.VueModule) {
    return <T extends {new(...args:any[]):{}}> (Module: T) => {
        VgHelper.setElementConfig(config, Module);

        console.log(Module);
    };
}
