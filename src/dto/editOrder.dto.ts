import { EOrderStatus } from '@/enum/EOrderStatus.enum';
import { Expose, Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, MinDate } from "class-validator";

export class EditOrderDto {
    @Expose()
    id!: number

    @IsOptional()
    @IsNumber()
    @Expose()
    serviceId!: number

    @IsOptional()
    @Type(() => Date)
    @Transform(({ value }) => new Date(value))
    @MinDate(new Date(new Date().getTime() + 3 * 60 * 60 * 1000), {
        message: 'Date cannot be earlier than 3 hours from the current time.'
    })
    @Expose()
    orderData!: string

    @IsOptional()
    @IsString()
    @Expose()
    address!: string

    @IsOptional()
    @IsNumber()
    @Expose()
    performersQuantity!: number

    @IsOptional()
    @IsNumber()
    @Expose()
    lat!: number

    @IsOptional()
    @IsNumber()
    @Expose()
    lng!: number

    @IsOptional()
    @IsString()
    @IsEnum(EOrderStatus, {
        message: `Order status should be one of: ${Object.values(EOrderStatus).join(', ')}.`
    })
    @Expose()
    status!: EOrderStatus

    @IsOptional()
    @IsString()
    @Expose()
    description!: string

    @IsOptional()
    @IsNumber()
    @Expose()
    managerId!: number

    @IsOptional()
    @IsString()
    @Expose()
    displayName!: string

    @IsOptional()
    @IsString()
    @Expose()
    phone!: string
}