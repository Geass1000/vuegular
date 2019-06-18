import * as _ from 'lodash';
import * as DiInterfaces from './di.interfaces';

export class DITreeNode {
    private _parent!: DITreeNode;
    public get parent (): DITreeNode {
        return this._parent;
    }

    private children!: DITreeNode[];
    private value!: any;

    private _data: DiInterfaces.DITreeNodeData
    public get data (): DiInterfaces.DITreeNodeData {
        return this._data;
    }

    constructor (data: DiInterfaces.DITreeNodeData) {
        this._data = data;
        this.children = [];
    }

    public setValue (value: any) {
        this.value = value;
    }

    /**
     * Sets the list of node of children.
     * 
     * @param  {DITreeNode[]} children
     * @returns void
     */
    public addChildren (children: DITreeNode[]): void {
        this.children = [ ...this.children, ...children ];
    }

    /**
     * Sets the link to the parent.
     *
     * @param  {DITreeNode<T} parent
     * @returns void
     */
    public setParent (parent: DITreeNode): void {
        this._parent = parent;
    }
    
    /**
     * Returns the instance of this node.
     *
     * @returns V
     */
    public getProvider (): any {
        return this.value;
    }
    
    /**
     * Finds the provider in the provider list of this node.
     * 
     * @param  {any} provider
     * @returns boolean
     */
    public hasNode (provider: any): boolean {
        return _.some(this.children, (child) => {
            return child.isNode(provider);
        });
    }

    /**
     * Checks: Is the right node/provider? 
     *
     * @param  {any} provider
     * @returns boolean
     */
    public isNode (provider: DITreeNode): boolean;
    public isNode (provider: any): boolean {
        let value: any;

        if (provider instanceof DITreeNode) {
            value = provider.data.value;
        } else {
            value = provider;
        }

        return this.data.value === value;
    }
}
