import { IsAllowCancelOrder } from '@/decorators/IsAllowCancelOrder.decorator';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CancelOrderDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @IsAllowCancelOrder({
        message: 'You cannot cancel the order as there is less than an hour left until its start.'
    })
    id!: number;
}