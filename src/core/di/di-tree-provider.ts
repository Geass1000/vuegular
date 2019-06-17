import * as _ from 'lodash';

export class DITreeProvider<T, V> {
    protected _parent!: DITreeProvider<T, V>;
    public get parent (): DITreeProvider<T, V> {
        return this._parent;
    }

    protected providers!: DITreeProvider<T, V>[];
    protected value!: V;

    constructor (
        protected type: T) {
        this.providers = [];
    }

    public setValue (value: V) {
        this.value = value;
    }

    /**
     * Sets the list of node of providers.
     * 
     * @param  {any[]} providers
     * @returns void
     */
    public setProviders (providers: any[]): void {
        this.providers = [ ...providers ];
    }

    /**
     * Sets the link to the parent.
     *
     * @param  {DITreeProvider<T} parent
     * @param  {} V>
     * @returns void
     */
    public setParent (parent: DITreeProvider<T,V>): void {
        this._parent = parent;
    }
    
    /**
     * Returns the instance of this node.
     *
     * @returns V
     */
    public getProvider (): V {
        return this.value;
    }
    
    /**
     * Finds the provider in the provider list of this node.
     * 
     * @param  {T} provider
     * @returns boolean
     */
    public hasProvider (provider: T): boolean {
        return _.some(this.providers, (child) => {
            return child.isProvider(provider);
        });
    }

    /**
     * Checks: Is the right provider? 
     *
     * @param  {T} provider
     * @returns boolean
     */
    public isProvider (provider: T): boolean {
        return this.type === provider;
    }
}
