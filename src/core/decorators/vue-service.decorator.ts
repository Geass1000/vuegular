import * as Interfaces from '../interfaces';

export function VueService (config?: Interfaces.VueService) {
    return <T extends {new(...args:any[]):{}}> (Service: T) => {
        console.log(Service);
    };
}
