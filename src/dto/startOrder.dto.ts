import { IsOrderExist } from '@/decorators/IsOrderExist.decorator';
import { EOrderStatus } from '@/enum/EOrderStatus.enum';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class StartOrderDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @IsOrderExist([
        EOrderStatus.SEARCHING,
        EOrderStatus.WAITING,
        EOrderStatus.ON_MANAGER,
        EOrderStatus.IN_PROGRESS
    ], {
        message: "The order status does not allow start it."
    })
    id!: number;
}