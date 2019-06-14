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
            throw new Error (`DI Element (${elKey}) must have a class type!`);
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

        // Checking: Is a user trying to set a `single` vaule in the multi DI Data? `Yes` - throw error.
        if (!elOpts.multi && _.isArray(elData)) {
            throw new Error(`DI Data (${elKey}) is a multi dependency!`);
        }

        // Checking: Is there a `single` value in DI Storage? `Yes` - throw error.
        if (!elOpts.multi && !_.isUndefined(elData)) {
            throw new Error(`DI Data (${elKey}) already exists!`);
        }

        // Creates a new DI Data for the DI Element by element type.
        let elDataValue: Interfaces.DIElement.Data;
        switch (elOpts.type) {
            case DIElementDataType.Ref:
                elDataValue = {
                    type: DIElementDataType.Ref,
                    key: elValue,
                };
                break;
            case DIElementDataType.Value:
                elDataValue = {
                    type: DIElementDataType.Value,
                    value: elValue,
                };
                break;
            default:
                throw new Error(`Unknown type of the DI Provider!`);
        }

        // Checking: Is there a new DI Value in DI Data? `Yes` - throw error.
        if (elOpts.multi) {
            const foundElData = _.find(elData, (value: Interfaces.DIElement.Data) => {
                return (value.type === DIElementDataType.Ref && value.key === elValue)
                    || (value.type === DIElementDataType.Value && value.value === elValue);
            });

            if (!_.isUndefined(foundElData)) {
                throw new Error (`There is a ${elValue} value in the DI Provider (${elKey})!`);
            }
        }

        // Sets or adds a new DI Value to the DI Data
        const newElData: Interfaces.DIElement.Data | Interfaces.DIElement.Data[] = elOpts.multi
            ? _.concat(elData || [], elDataValue) : elDataValue;

        // Sets a new DI Data
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
