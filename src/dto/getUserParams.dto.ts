import { Expose } from 'class-transformer';
import { IsByteLength, IsEnum, IsOptional, IsString, Matches } from "class-validator";
import { ERole } from '@/enum/ERole.enum';
import { EUserStatus } from '@/enum/EUserStatus.enum';

export class getUserParams {
    @Expose()
    @IsString()
    @IsOptional()
    displayName!: string;

    @Expose()
    @IsString()
    @IsOptional()
    @Matches(/^[0-9]+$/, {
        message: 'Phone number should contain only digits'
    })
    @IsByteLength(1, 10)
    phone!: string;

    @Expose()
    @IsString()
    @IsOptional()
    email!: string;

    @Expose()
    @IsString()
    @IsOptional()
    @IsEnum(ERole, {
        message: `User role should be one of: ${Object.values(ERole).join(', ')}.`
    })
    role!: ERole;

    @Expose()
    @IsString()
    @IsOptional()
    @Matches(/^[0-9]+$/, {
        message: 'BIN/IIN field should contain only digits.'
    })
    @IsByteLength(1, 12)
    identifyingNumber!: string;

    @Expose()
    @IsString()
    @IsOptional()
    @IsEnum(EUserStatus, {
        message: `User status should be one of: ${Object.values(EUserStatus).join(', ')}.`
    })
    status!: EUserStatus;
}
