import * as Interfaces from '../interfaces';

export function VueModule (config: Interfaces.VueModule) {
    return <T extends {new(...args:any[]):{}}> (Module: T) => {
        console.log(Module);
    };
}
