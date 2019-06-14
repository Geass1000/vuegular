import { DIContainer } from './../di/di-container';
import { VgHelper } from '../vg.helper';
import * as Interfaces from '../interfaces';

export function VgModule (config: Interfaces.VueModule) {
    return <T extends {new(...args:any[]):{}}> (Module: T) => {
        DIContainer.getInstance().bindClass(Module);
        VgHelper.setElementConfig(config, Module);

        console.log(Module);
    };
}
