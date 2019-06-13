
export class VuegularHelper {
    static setElementConfig<T> (config: T, target: any) {
        Reflect.defineMetadata(`vuegular:config`, config, target);        
    }
}