import { VgHelper } from '../vg.helper';
import * as Interfaces from '../interfaces';

export function VgService (config?: Interfaces.VueService) {
    return <T extends {new(...args:any[]):{}}> (Service: T) => {
        VgHelper.setElementConfig(config, Service);
        console.log(Service);
    };
}
