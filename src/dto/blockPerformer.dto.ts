import { IsResponseExist } from '@/decorators/IsResponseExist.decorator';
import { EResponseStatus } from '@/enum/EResponseStatus.enum';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BlockPerformerDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @IsResponseExist([
        EResponseStatus.WAITING,
        EResponseStatus.IN_PATH,
        EResponseStatus.AWAITING_CONFIRMATION_ARRIVAL,
        EResponseStatus.IN_PROGRESS,
        EResponseStatus.AWAITING_CONFIRMATION_COMPLETION
    ], {
        message: "The response status does not allow it to be banned."
    })
    id!: number;
}