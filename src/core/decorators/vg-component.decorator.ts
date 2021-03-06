import { DIContainer } from './../di/di-container';
import { VgHelper } from '../vg.helper';
import * as VgInterfaces from '../vg.interfaces';

export function VgComponent (config: VgInterfaces.VgComponent) {
    // Gets Vue lifecycle hooks
    // Gets methods
    // Gets mixins
    // Gets computed props

    return <T extends {new(...args:any[]):{}}> (Component: T) => {
        DIContainer.getInstance().bindClass(Component);
        VgHelper.setElementConfig(config, Component);

        console.log(Component);
        Object.getOwnPropertyNames(Component.prototype).forEach((key) => {
            const descriptor = Object.getOwnPropertyDescriptor(Component.prototype, key);
            // console.log(`Key:`, key, descriptor);
        });
        
        // Gets dependencies for component
        // Creates the instance of User component
        // Gets data props
        // Creates the instance of Vue component and assigns all to him

        // const inst = new Component();
        // console.log(Object.keys(inst));
        // console.log(`Class:`, Reflect.getMetadata("design:paramtypes", Component));
    };
}
