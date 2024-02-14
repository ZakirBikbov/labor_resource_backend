import { EResponseStatus } from '@/enum/EResponseStatus.enum';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class EditResponseDto {
    @Expose()
    id!: number

    @IsOptional()
    @IsNumber()
    @Expose()
    performerId!: number

    @IsOptional()
    @IsNumber()
    @Expose()
    orderId!: number

    @IsOptional()
    @IsString()
    @Expose()
    start!: string

    @IsOptional()
    @IsString()
    @Expose()
    end!: string

    @IsOptional()
    @IsString()
    @IsEnum(EResponseStatus, {
        message: `Response status should be one of: ${Object.values(EResponseStatus).join(', ')}.`
    })
    @Expose()
    status!: EResponseStatus

    @IsOptional()
    @IsNumber()
    @Expose()
    performerRating!: number

    @IsOptional()
    @IsNumber()
    @Expose()
    customerRating!: number
}