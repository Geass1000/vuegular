
export class VuegularHelper {
    static setElementConfig<T> (config: T, target: any) {
        Reflect.defineMetadata(`vuegular:config`, config, target);        
    }

    static getElementConfig (target: any): any {
        Reflect.getMetadata(`vuegular:config`, target);        
    }
}