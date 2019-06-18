import { DIElementDataType, DITreeNodeType } from './di.enums';
import { DIToken } from './di-token';

export interface DITreeNodeData {
    type: DITreeNodeType;
    value: any;
}

export namespace DIElement {
    export type Key = DIToken | any;

    export namespace Data {
        export interface Class {
            type: DIElementDataType.Class;
            params: any[];
        }
        export interface Ref {
            type: DIElementDataType.Ref;
            key: Key;
        }
        export interface Value {
            type: DIElementDataType.Value;
            value: any;
        }
    }

    export interface Options {
        type: DIElementDataType;
        multi: boolean;
    }

    export type Data = Data.Class | Data.Ref | Data.Value;
}

