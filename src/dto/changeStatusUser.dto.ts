import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { EUserStatus } from '@/enum/EUserStatus.enum';

export class ChangeUserStatusDto {
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsEnum(EUserStatus, {
        message: `User status should be one of: ${Object.values(EUserStatus).join(', ')}.`
    })
    status!: EUserStatus;
}
