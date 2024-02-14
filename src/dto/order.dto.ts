import { Expose, Transform, Type } from 'class-transformer';
import { IOrder } from '@/interfaces/IOrder.interface';
import { IsNotEmpty, IsNumber, IsString, MinDate } from "class-validator";

export class OrderDto implements IOrder {
	@Expose()
	id!: number

	@IsNotEmpty()
	@IsNumber()
	@Expose()
	customerId!: number

	@IsNotEmpty()
	@IsNumber()
	@Expose()
	serviceId!: number

	@IsNotEmpty()
	@Type(() => String)
	@Transform(({ value }) => new Date(value))
	@MinDate(new Date(new Date().getTime() + 3 * 60 * 60 * 1000), {
		message: 'Date cannot be earlier than 3 hours from the current time.'
	})
	@Expose()
	orderData!: string

	@IsNotEmpty()
	@IsString()
	@Expose()
	address!: string

	@IsNotEmpty()
	@IsNumber()
	@Expose()
	performersQuantity!: number

	@IsNotEmpty()
	@IsNumber()
	@Expose()
	lat!: number

	@IsNotEmpty()
	@IsNumber()
	@Expose()
	lng!: number

	@IsNotEmpty()
	@IsString()
	@Expose()
	description!: string

	@IsNumber()
	@Expose()
	managerId!: number

	@IsString()
	@Expose()
	displayName!: string

	@IsString()
	@Expose()
	phone!: string
}