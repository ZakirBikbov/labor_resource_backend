import { IsResponseExist } from '@/decorators/IsResponseExist.decorator';
import { EResponseStatus } from '@/enum/EResponseStatus.enum';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ClosedResponseDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @IsResponseExist([EResponseStatus.DONE], {
        message: "The response status is not Done."
    })
    id!: number;
}