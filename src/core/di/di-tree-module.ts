import * as _ from 'lodash';

import { DITreeProvider } from './di-tree-provider';

export class DITreeModule<T, V> extends DITreeProvider<T, V> {
    protected modules!: DITreeModule<T, V>[];

    constructor (protected type: T) {
        super(type);
        this.modules = [];
    }

    /**
     * Sets the list of node of modules.
     * 
     * @param  {any[]} modules
     * @returns void
     */
    public setModules (modules: any[]): void {
        this.modules = [];
        _.forEach(modules, (module) => {
            const node = new DITreeModule<any, any>(module);
            this.addChildModule(node);
        });
    }

    /**
     * Adds a module to the module list.
     * 
     * @param  {DITreeModule<T, V>} child
     * @returns void
     */
    private addChildModule (child: DITreeModule<T, V>): void {
        this.modules.push(child);
    }
}
