import { DITreeProvider } from './di/di-tree-provider';
import { DITree } from './di/di-tree';
import { Singleton } from './shared/singleton.base';
import * as _ from 'lodash'; 
import { VgHelper } from './vg.helper';

import * as Interfaces from './interfaces';
import { DITreeModule } from './di/di-tree-module';

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
        const node: DITreeModule<any, any> = new DITreeModule<any, any>(el);
        
        const modules = moduleConfig.modules;
        const moduleNodes = _.map(modules, (module) => this.visitModule(node, module));

        const providers = moduleConfig.providers;
        const providerNodes = _.map(providers, (provider) => this.visitProvider(el, provider));
        
        const cmps = moduleConfig.components;
        const componentNodes = _.map(cmps, (cmp) => this.visitComponent(el, cmp));
        
        node.setParent(parentEl);
        node.setModules(moduleNodes);
        node.setComponents(componentNodes);
        node.setProviders(providerNodes);
        console.log(`M`, node);
        return node;
    }

    private visitProvider (parentEl: any, el: any) {
        const pvdConfig: Interfaces.DIProvider = VgHelper.getElementConfig(el);
        const node: DITreeProvider<any, any> = new DITreeProvider<any, any>(el);
        
        if (!_.isUndefined(pvdConfig)) {
            const providers = pvdConfig.providers;
            _.map(providers, (provider) => this.visitProvider(el, provider));
        }

        node.setParent(parentEl);
        console.log(`Pr`, node);
        return node;
    }

    private visitComponent (parentEl: any, el: any) {
        const cmpConfig: Interfaces.VueComponent = VgHelper.getElementConfig(el);
        const node: DITreeProvider<any, any> = new DITreeProvider<any, any>(el);

        if (!_.isUndefined(cmpConfig)) {
            const providers = cmpConfig.providers;
            _.map(providers, (provider) => this.visitProvider(el, provider));
        }

        node.setParent(parentEl);
        console.log(`Co`, node);
        return node;
    }
}
