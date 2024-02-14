import { IsResponseExist } from '@/decorators/IsResponseExist.decorator';
import { EResponseStatus } from '@/enum/EResponseStatus.enum';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ArrivalNotificationDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @IsResponseExist([EResponseStatus.IN_PATH, EResponseStatus.WAITING], {
        message: "The response status does not allow notifying the client of the performer's arrival."
    })
    id!: number;
}