import { DITree } from './di/di-tree';
import { Singleton } from './shared/singleton.base';
import * as _ from 'lodash'; 
import { VgHelper } from './vg.helper';

import * as Interfaces from './interfaces';

export class VgApp extends Singleton {
    private diTree!: DITree;

    public bootstrapModule (moduleClass: any) {
        this.createDITree(moduleClass);
    }

    private createDITree (rootElement: any) {
        this.diTree = DITree.getInstance();
        this.visitModule(null, rootElement);
    }

    private visitModule (parentEl: any, el: any) {
        const moduleConfig: Interfaces.VueModule = VgHelper.getElementConfig(el);
        
        const modules = moduleConfig.modules;
        _.map(modules, (module) => this.visitModule(el, module));

        const providers = moduleConfig.providers;
        _.map(providers, (provider) => this.visitProvider(el, provider));
        
        const cmps = moduleConfig.components;
        _.map(cmps, (cmp) => this.visitComponent(el, cmp));
        console.log(`M`, el, parentEl);
    }

    private visitProvider (parentEl: any, el: any) {
        const pvdConfig: Interfaces.DIProvider = VgHelper.getElementConfig(el);
        
        if (!_.isUndefined(pvdConfig)) {
            const providers = pvdConfig.providers;
            _.map(providers, (provider) => this.visitProvider(el, provider));
        }

        console.log(`Pr`, el, parentEl);
    }

    private visitComponent (parentEl: any, el: any) {
        const cmpConfig: Interfaces.VueComponent = VgHelper.getElementConfig(el);
        if (!_.isUndefined(cmpConfig)) {
            const providers = cmpConfig.providers;
            _.map(providers, (provider) => this.visitProvider(el, provider));
        }
        console.log(`Co`, el, parentEl);
    }
}
