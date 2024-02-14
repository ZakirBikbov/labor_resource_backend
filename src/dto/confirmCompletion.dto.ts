import { IsResponseExist } from '@/decorators/IsResponseExist.decorator';
import { EResponseStatus } from '@/enum/EResponseStatus.enum';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ConfirmCompletionDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @IsResponseExist([EResponseStatus.AWAITING_CONFIRMATION_COMPLETION], {
        message: "The response status does not allow confirming the completion of work by the performer."
    })
    id!: number;
}