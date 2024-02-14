import { Order } from '@/entities/order.entity';
import { User } from '@/entities/user.entity';
import { EResponseStatus } from '@/enum/EResponseStatus.enum';

export interface IResponse {
	id: number;
	performerId: number;
	orderId: number;
	start: string;
	end: string;
	status: EResponseStatus;
	performerRating: number;
	customerRating: number;
	performer: User;
	order: Order;
}