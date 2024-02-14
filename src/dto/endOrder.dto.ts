import { IsOrderExist } from '@/decorators/IsOrderExist.decorator';
import { EOrderStatus } from '@/enum/EOrderStatus.enum';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class EndOrderDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @IsOrderExist([
        EOrderStatus.IN_PROGRESS
    ], {
        message: "The order status does not allow end it."
    })
    id!: number;
}