import * as _ from 'lodash';

import { DITreeProvider } from './di-tree-provider';

export class DITreeModule<T, V> extends DITreeProvider<T, V> {
    protected modules!: DITreeModule<any, any>[];
    protected components!: DITreeProvider<any, any>[];

    constructor (protected type: T) {
        super(type);
        this.modules = [];
    }

    /**
     * Sets the list of node of modules.
     * 
     * @param  {DITreeModule<any,any>[]} modules
     * @returns void
     */
    public setModules (modules: DITreeModule<any, any>[]): void {
        this.modules = [ ...modules ];
    }

    /**
     * Sets the list of node of components.
     * 
     * @param  {DITreeProvider<any,any>[]} components
     * @returns void
     */
    public setComponents (components: DITreeProvider<any, any>[]): void {
        this.components = [ ...components ];
    }
}
