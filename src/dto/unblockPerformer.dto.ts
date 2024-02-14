import { IsResponseExist } from '@/decorators/IsResponseExist.decorator';
import { EResponseStatus } from '@/enum/EResponseStatus.enum';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UnblockPerformerDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @IsResponseExist([
        EResponseStatus.BANNED
    ], {
        message: "The response status prevents the user from being unbanned."
    })
    id!: number;
}