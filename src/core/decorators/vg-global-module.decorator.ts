import { DIContainer } from './../di/di-container';
import { VgHelper } from '../vg.helper';
import * as VgInterfaces from '../vg.interfaces';

export function VgGlobalModule (config: VgInterfaces.VgGlobalModule) {
    return <T extends {new(...args:any[]):{}}> (Module: T) => {
        DIContainer.getInstance().bindClass(Module);
        VgHelper.setElementConfig<VgInterfaces.VgModule>({
            global: true,
            ...config,
        }, Module);

        console.log(Module);
    };
}
