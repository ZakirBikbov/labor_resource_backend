import { IsOrderExist } from '@/decorators/IsOrderExist.decorator';
import { EOrderStatus } from '@/enum/EOrderStatus.enum';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ConfirmArrivalForAllDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @IsOrderExist([EOrderStatus.WAITING, EOrderStatus.ON_MANAGER], {
        message: "The order status does not allow confirming the arrival of performers."
    })
    orderId!: number;
}