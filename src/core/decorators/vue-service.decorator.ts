import { VuegularHelper } from '../vuegular.helper';
import * as Interfaces from '../interfaces';

export function VueService (config?: Interfaces.VueService) {
    return <T extends {new(...args:any[]):{}}> (Service: T) => {
        VuegularHelper.setElementConfig(config, Service);
        console.log(Service);
    };
}
