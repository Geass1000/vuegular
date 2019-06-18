import { DITreeNode } from './di/di-tree-node';
import { Singleton } from './shared/singleton.base';
import * as _ from 'lodash'; 
import { VgHelper } from './vg.helper';

import { DITree } from './di/di-tree';
import { DITreeNodeType } from './di/di.enums';

export class VgApp extends Singleton {

    public bootstrapModule (moduleClass: any) {
        this.createDITree(moduleClass);
    }

    private createDITree (rootElement: any) {
        const diTree = DITree.getInstance();
        diTree.create(rootElement);
    }
}
