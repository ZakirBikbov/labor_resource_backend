import { IsResponseExist } from '@/decorators/IsResponseExist.decorator';
import { EResponseStatus } from '@/enum/EResponseStatus.enum';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ConfirmArrivalDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @IsResponseExist([EResponseStatus.AWAITING_CONFIRMATION_ARRIVAL], {
        message: "The response status does not allow confirming the arrival of the performer."
    })
    id!: number;
}