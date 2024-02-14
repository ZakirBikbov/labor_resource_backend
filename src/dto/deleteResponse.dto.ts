import { IsAllowDeleteResponse } from '@/decorators/IsAllowDeleteResponse.decorator';
import { IsResponseExist } from '@/decorators/IsResponseExist.decorator';
import { EResponseStatus } from '@/enum/EResponseStatus.enum';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteResponseDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @IsAllowDeleteResponse({
        message: 'You cannot decline the order as there is less than an hour left until its start.'
    })
    @IsResponseExist([
        EResponseStatus.WAITING,
        EResponseStatus.IN_PATH,
        EResponseStatus.AWAITING_CONFIRMATION_ARRIVAL
    ], {
        message: "The response status does not allow delete it."
    })
    id!: number;
}