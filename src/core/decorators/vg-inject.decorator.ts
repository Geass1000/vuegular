import { DIContainer } from '../di/di-container';
import { DIToken } from '../di/di-token';

export function VgInject (diKey: DIToken) {
    return (target: Object, propertyKey: string | symbol, paramIndex: number) => {
        DIContainer.getInstance().bindParam(target, paramIndex, diKey);
        console.log(target, paramIndex, diKey);
    };
}
