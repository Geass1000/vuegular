import * as _ from 'lodash';

import { Singleton } from './../shared/singleton.base';

import { DITreeNode } from './di-tree-node';
import { VgHelper } from './../vg.helper';

import * as DiEnums from './di.enums';
import * as VgInterfaces from '../vg.interfaces';
import * as DiInterfaces from './di.interfaces';

export class DITree extends Singleton {
    private rootNode: DITreeNode;
    private globalNodes: DITreeNode[];

    /**
     * Creates a DI Tree for `root` module and global DI Tree Nodes (DITN).
     *
     * @param  {any} rootModule - class of the `root` module
     * @returns void
     */
    public create (rootModule: any): void {
        this.globalNodes = [];
        
        // Creates DI Tree for `root` module and global DITNs
        const rootNode = this.visitModule(null, rootModule);
        this.rootNode = rootNode;
    }

    /**
     * Visits a `current` module. Fn does:
     * 1. Creates the DI Tree Node (DITN) for `current` module.
     * 2. Calls itself for each child module (recursion).
     * 3. Visits `providers` and `components` lists of `current` module.
     * 4. Sets all children (modules, providers and components).
     * 5. Sets `current` module as `global` or returns DITN for `current` module.
     * 
     * @param  {DITreeNode} parentModule - DITN of the parent
     * @param  {any} curModule - class of the `module`
     * @returns DITreeNode
     */
    private visitModule (parentModule: DITreeNode, curModule: any): DITreeNode {
        // Gets the config of `current` module and creates DITN for him
        const moduleConfig: VgInterfaces.VgModule = VgHelper.getElementConfig(curModule);        
        const node = new DITreeNode({ type: DiEnums.DITreeNodeType.Module, value: curModule });
        
        // Visits the each imported module and returns DITN for this module
        // Skips modules who returns `null`
        const modules = moduleConfig.modules;
        const moduleNodes = _.chain(modules)
            .map((module) => this.visitModule(node, module))
            .filter((module) => !_.isNull(module))
            .value();

        // Visits the each provider and returns DITN for this provider
        const providers = moduleConfig.providers;
        const providerNodes = _.map(providers, (provider) => this.visitProvider(node, {
            type: DiEnums.DITreeNodeType.Provider, value: provider }));
        
        // Visits the each component and returns DITN for this component
        const cmps = moduleConfig.components;
        const componentNodes = _.map(cmps, (cmp) => this.visitProvider(node, {
            type: DiEnums.DITreeNodeType.Component, value: cmp }));
        
        // Sets a parent of `current` module and his children
        node.setParent(parentModule);
        node.addChildren(moduleNodes);
        node.addChildren(providerNodes);
        node.addChildren(componentNodes);

        // If module is local, fn will return DITN of `current` module
        if (!moduleConfig.global) {
            return node;
        }
        
        // Else fn will add `current` module to global list
        // and retuns `null`.  
        this.addGlobalNode(node);
        return null;
    }

    /**
     * Visits provider (or component). Fn does:
     * 1. Creates the DI Tree Node (DITN) for `current` provider.
     * 3. Visits `providers` list of the `current` provider.
     * 4. Sets all children (providers).
     * 5. Returns DITN for `current` provider.
     *
     * @param  {DITreeNode} parentEl - DITN of the parent
     * @param  {DiInterfaces.DITreeNodeData} diNodeData - DITN data
     * @returns DITreeNode
     */
    private visitProvider (parentEl: DITreeNode, diNodeData: DiInterfaces.DITreeNodeData): DITreeNode {
        // Gets the config of `current` provider and creates DITN for him
        const pvdConfig: VgInterfaces.DIProvider = VgHelper.getElementConfig(diNodeData.value);
        const node = new DITreeNode(diNodeData);
        
        // Visits the each provider and returns DITN for this provider
        let providerNodes: DITreeNode[] = [];
        if (!_.isUndefined(pvdConfig)) {
            const providers = pvdConfig.providers;
            providerNodes = _.map(providers, (provider) => this.visitProvider(node, {
                type: DiEnums.DITreeNodeType.Provider, value: provider }));
        }

        node.setParent(parentEl);
        node.addChildren(providerNodes);

        // Returns DITN of `current` provider
        return node;
    }

    /**
     * Finds a node in the list of global nodes.
     * 
     * @param  {DITreeNode} node - new global node
     * @returns DITreeNode | undefined
     */
    private findGlobalNode (node: DITreeNode): DITreeNode | undefined {
        return _.find(this.globalNodes, (globalNode) => {
            return globalNode.isNode(node);
        });
    }

    /**
     * Checks: Is there a node in the list of global nodes? - Yes, return `true`. 
     * 
     * @param  {DITreeNode} node - new global node
     * @returns boolean
     */
    private hasGlobalNode (node: DITreeNode): boolean {
        const globalNode = this.findGlobalNode(node);
        return !_.isUndefined(globalNode);
    }
    
    /**
     * Adds node to the list of global nodes.
     * Checks: Is there a node in the list of global nodes? - Yes, throw error. 
     * 
     * @param  {DITreeNode} node - new global node
     * @returns void
     */
    private addGlobalNode (node: DITreeNode): void {
        if (this.hasGlobalNode(node)) {
            throw new Error(`Node is already registred! ` + node);
        }

        this.globalNodes.push(node);
    }
}
