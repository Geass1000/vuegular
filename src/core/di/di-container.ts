import { DIElementDataType } from './di.enums';
import * as _ from 'lodash';

import { Singleton } from '../shared/singleton.base';

import { DIToken } from './di-token';
import * as Interfaces from './di.interfaces'

export class DIContainer extends Singleton {
    private elStorage: Map<Interfaces.DIElement.Key, Interfaces.DIElement.Data | Interfaces.DIElement.Data[]> = new Map();

    public bindClass (elKey: Interfaces.DIElement.Key): void {
        const elData: Interfaces.DIElement.Data.Class = 
            this.getElementData(elKey) as Interfaces.DIElement.Data.Class || {
                type: DIElementDataType.Class,
                params: [],
            };

        if (elData.type !== DIElementDataType.Class) {
            throw new Error (`DI Element must have a class type!`);
        }

        const classParams: any[] = Reflect.getMetadata(`design:paramtypes`, elKey);
        const elParams: any[] = [ ...elData.params ];

        _.forEach(classParams, (value, index) => {
            if (!_.isUndefined(elParams[index])) {
                return;
            }
            elParams[index] = value;
        });

        this.setElementData(elKey, _.assign({}, elData, {
            params: elParams,
        }));
    }

    public bindParam (elKey: Interfaces.DIElement.Key, paramIndex: number,
            paramValue: DIToken): void {
        const elData: Interfaces.DIElement.Data.Class = 
            this.getElementData(elKey) as Interfaces.DIElement.Data.Class || {
                type: DIElementDataType.Class,
                params: [],
            };
        
        const elParams: any[] = [ ...elData.params ];
        elParams[paramIndex] = paramValue;

        this.setElementData(elKey, _.assign({}, elData, {
            params: elParams,
        }));
    }

    public bind (elKey: Interfaces.DIElement.Key, elValue: any,
            elOpts: Interfaces.DIElement.Options): void {
        let elData = this.getElementData(elKey);

        if (!elOpts.multi && !_.isUndefined(elData)) {
            throw new Error(`DI Data for ${elKey} already exists!`);
        }

        if (elOpts.multi && _.isUndefined(elData)) {
            elData = [];
        }

        let elDataValue: Interfaces.DIElement.Data;
        switch (elOpts.type) {
            case DIElementDataType.Ref: elDataValue = {
                    type: DIElementDataType.Ref,
                    key: elValue,
                }; break;
            case DIElementDataType.Value: elDataValue = {
                    type: DIElementDataType.Value,
                    value: elValue,
                }; break;
            default:
                throw new Error(`Unknown type of the DI Provider!`);
        }

        if (elOpts.multi) {
            const foundElData = _.find(elData as Interfaces.DIElement.Data[], (value) => {
                return (value.type === DIElementDataType.Ref
                    && value.key === (elDataValue as Interfaces.DIElement.Data.Ref).key)
                    || (value.type === DIElementDataType.Value
                    && value.value === (elDataValue as Interfaces.DIElement.Data.Value).value);
            });

            if (!_.isUndefined(foundElData)) {
                throw new Error (`DI Provider (${elKey}) is already registered`);
            }
        }

        const newElData = elOpts.multi
            ? [ ...elData as Interfaces.DIElement.Data[], elDataValue ] as Interfaces.DIElement.Data[]
            : elDataValue as Interfaces.DIElement.Data;

        this.setElementData(elKey, newElData);
    }

    private getElementData (elKey: Interfaces.DIElement.Key): Interfaces.DIElement.Data
            | Interfaces.DIElement.Data[] | undefined {
        return this.elStorage.get(elKey);
    }

    private setElementData (elKey: Interfaces.DIElement.Key,
            elData: Interfaces.DIElement.Data | Interfaces.DIElement.Data[]): void {
        this.elStorage.set(elKey, elData);
    }
}
