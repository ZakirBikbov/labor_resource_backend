import { IsResponseExist } from '@/decorators/IsResponseExist.decorator';
import { EResponseStatus } from '@/enum/EResponseStatus.enum';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CompletionNotificationDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @IsResponseExist([EResponseStatus.IN_PROGRESS], {
        message: "The response status does not allow notifying the client of the completion of the performer's work."
    })
    id!: number;
}