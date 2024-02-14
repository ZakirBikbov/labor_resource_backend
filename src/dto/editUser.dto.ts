import { EUserStatus } from '@/enum/EUserStatus.enum';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class EditUserDto {
    @Expose()
    id!: number

    @IsOptional()
    @IsNumber()
    @Expose()
    phone!: string

    @IsOptional()
    @IsString()
    @Expose()
    displayName!: string

    @IsOptional()
    @IsString()
    @Expose()
    email!: string

    @IsOptional()
    @IsString()
    @Expose()
    birthday!: string

    @IsOptional()
    @IsString()
    @Expose()
    avatar!: string

    @IsOptional()
    @IsNumber()
    @Expose()
    identifyingNumber!: string

    @IsOptional()
    @IsString()
    @IsEnum(EUserStatus, {
        message: `User status should be one of: ${Object.values(EUserStatus).join(', ')}.`
    })
    @Expose()
    status!: EUserStatus
}