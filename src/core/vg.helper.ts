
export class VgHelper {
    static setElementConfig<T> (config: T, target: any) {
        Reflect.defineMetadata(`vuegular:config`, config, target);        
    }

    static getElementConfig (target: any): any {
        return Reflect.getMetadata(`vuegular:config`, target);        
    }
}