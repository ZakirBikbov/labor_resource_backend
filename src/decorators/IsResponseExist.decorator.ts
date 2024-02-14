import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { EResponseStatus } from '@/enum/EResponseStatus.enum';
import { ResponseRepository } from '@/repositories/response.repository';

@ValidatorConstraint({ async: true })
export class IsResponseExistConstraint implements ValidatorConstraintInterface {
    private responseRepository: ResponseRepository;

    constructor() {
        this.responseRepository = new ResponseRepository();
    }

    async validate(id: number, args: ValidationArguments) {
        const [statuses] = args.constraints;
        if (!id || !statuses) return false;
        const response = await this.responseRepository.findOne({ where: { id } });
        return response !== null && statuses.includes(response.status);
    }
}

export function IsResponseExist(statuses: EResponseStatus[], validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [statuses],
            async: true,
            validator: IsResponseExistConstraint,
        });
    };
}