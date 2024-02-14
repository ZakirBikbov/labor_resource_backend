import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { OrderRepository } from '@/repositories/order.repository';

@ValidatorConstraint({ async: true })
export class IsAllowCancelOrderConstraint implements ValidatorConstraintInterface {
    private orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async validate(id: number, args: ValidationArguments) {
        if (!id) return false;
        const order = await this.orderRepository.findOne({ where: { id } });
        if (order) {
            const orderData = new Date(order.orderData);
            const currentTime = new Date();
            const timeDifference = orderData.getTime() - currentTime.getTime();
            const hoursDifference = timeDifference / (1000 * 60 * 60);
            return hoursDifference >= 1;
        }
        return false;
    }
}

export function IsAllowCancelOrder(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            async: true,
            validator: IsAllowCancelOrderConstraint,
        });
    };
}