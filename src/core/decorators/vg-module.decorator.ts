import { DIContainer } from './../di/di-container';
import { VgHelper } from '../vg.helper';
import * as VgInterfaces from '../vg.interfaces';

export function VgModule (config: VgInterfaces.VgLocalModule) {
    return <T extends {new(...args:any[]):{}}> (Module: T) => {
        DIContainer.getInstance().bindClass(Module);
        VgHelper.setElementConfig<VgInterfaces.VgModule>({
            global: false,
            ...config,
        }, Module);

        console.log(Module);
    };
}
