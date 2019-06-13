
export function methodTest (simpleData: string) {
    return (target : any, propertyKey : string, descriptor : PropertyDescriptor) => {
        console.log(`Method:`, Reflect.getMetadata("design:paramtypes", target, propertyKey));
        console.log(`Method`, typeof target, target, `|`, typeof propertyKey, propertyKey, `|`, typeof descriptor, descriptor);
    };
}


export function classTest (simpleData: string) {
    return <T extends {new(...args:any[]):{}}> (constructor: T) => {
        console.log(`Class:`, Reflect.getMetadata("design:paramtypes", constructor));
        console.log(`Class`, typeof constructor, constructor);
    };
}

export function paramTest (simpleData: string) {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        console.log(`Param:`, Reflect.getMetadata("design:paramtypes", target, propertyKey));
        console.log(`Param`, typeof target, target, `|`, typeof propertyKey, propertyKey, `|`, typeof parameterIndex, parameterIndex);
    };
}
