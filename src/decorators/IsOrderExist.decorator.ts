import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { OrderRepository } from '@/repositories/order.repository';
import { EOrderStatus } from '@/enum/EOrderStatus.enum';

@ValidatorConstraint({ async: true })
export class IsOrderExistConstraint implements ValidatorConstraintInterface {
    private orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async validate(id: number, args: ValidationArguments) {
        const [statuses] = args.constraints;
        if (!id || !statuses) return false;
        const order = await this.orderRepository.findOne({ where: { id } });
        return order !== null && statuses.includes(order.status);
    }
}

export function IsOrderExist(statuses: EOrderStatus[], validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [statuses],
            async: true,
            validator: IsOrderExistConstraint,
        });
    };
}