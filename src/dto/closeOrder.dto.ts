import { IsOrderExist } from '@/decorators/IsOrderExist.decorator';
import { EOrderStatus } from '@/enum/EOrderStatus.enum';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CloseOrderDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @IsOrderExist([EOrderStatus.REQUIRES_PAYMENT], {
        message: "The order status does not allow closing it."
    })
    id!: number;
}