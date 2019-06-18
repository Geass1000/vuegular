import { DIContainer } from './../di';
import { VgHelper } from '../vg.helper';
import * as VgInterfaces from '../vg.interfaces';

export function VgService (config?: VgInterfaces.VgService) {
    return <T extends {new(...args:any[]):{}}> (Service: T) => {
        DIContainer.getInstance().bindClass(Service);
        VgHelper.setElementConfig(config, Service);
        console.log(Service);
    };
}
