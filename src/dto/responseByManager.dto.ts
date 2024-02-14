import { IsOrderExist } from '@/decorators/IsOrderExist.decorator';
import { IsUserExist } from '@/decorators/IsUserExist.decorator';
import { EOrderStatus } from '@/enum/EOrderStatus.enum';
import { ERole } from '@/enum/ERole.enum';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ResponseByManagerDto {
	@Expose()
	@IsNotEmpty()
	@IsNumber()
	@IsOrderExist([EOrderStatus.SEARCHING, EOrderStatus.ON_MANAGER], {
		message: "The order is no longer in the search for performers and cannot accept new responses"
	})
	orderId!: number;

	@Expose()
	@IsNotEmpty()
	@IsNumber()
	@IsUserExist(ERole.performer, {
		message: "Performer doesn't exists. Choose another performer."
	})
	performerId!: number;
}