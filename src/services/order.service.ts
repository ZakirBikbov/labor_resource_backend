import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { OrderRepository } from '@/repositories/order.repository';
import { ResponseRepository } from '@/repositories/response.repository';
import { IOrder } from '@/interfaces/IOrder.interface';
import { IOrderList } from '@/interfaces/IList.interface';
import { IGetOrderParams } from '@/interfaces/IGetParams';
import { EOrderStatus } from '@/enum/EOrderStatus.enum';
import { EResponseStatus } from '@/enum/EResponseStatus.enum';
import { OrderDto } from '@/dto/order.dto';
import { EditOrderDto } from '@/dto/editOrder.dto';
import { StartOrderDto } from '@/dto/startOrder.dto';
import { EndOrderDto } from '@/dto/endOrder.dto';
import { CancelOrderDto } from '@/dto/cancelOrder.dto';
import { CloseOrderDto } from '@/dto/closeOrder.dto';
import { EditResponseDto } from '@/dto/editResponse.dto';
import { In } from 'typeorm';

export class OrderService {
    private orderRepository: OrderRepository;
    private responseRepository: ResponseRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
        this.responseRepository = new ResponseRepository();
    }

    getOrders = async (params: IGetOrderParams): Promise<IOrderList> => {
        return await this.orderRepository.getOrders(params);
    }

    getOrderById = async (orderId: number): Promise<IOrder | null> => {
        return await this.orderRepository.getOrderById(orderId);
    }

    createOrder = async (orderDto: OrderDto): Promise<IOrder | null> => {
        return await this.orderRepository.createOrder(orderDto);
    }

    editOrder = async (orderDto: EditOrderDto): Promise<boolean> => {
        return await this.orderRepository.editOrder(orderDto);
    }

    startOrder = async ({ id }: StartOrderDto): Promise<{ success: boolean, start: string }> => {
        const responses = await this.responseRepository.find({ where: { orderId: id, status: EResponseStatus.AWAITING_CONFIRMATION_ARRIVAL } });
        const responsesId = responses.map(res => res.id);

        const editResponseDto = plainToInstance(EditResponseDto, {
            orderId: id,
            start: new Date().toISOString(),
            status: EResponseStatus.IN_PROGRESS
        })

        await this.responseRepository.editMultipleResponses(editResponseDto, responsesId)

        const editOrderDto = plainToInstance(EditOrderDto, {
            id,
            status: EOrderStatus.IN_PROGRESS
        });

        const errors = await validate(editOrderDto);
        if (errors.length) throw errors;
        return {
            success: await this.orderRepository.editOrder(editOrderDto),
            start: editResponseDto.start
        }
    }

    endOrder = async ({ id }: EndOrderDto): Promise<{ success: boolean, end: string }> => {
        const responses = await this.responseRepository.find({
            where: {
                orderId: id,
                status: In([
                    EResponseStatus.IN_PROGRESS,
                    EResponseStatus.AWAITING_CONFIRMATION_COMPLETION
                ])
            }
        });
        const responsesId = responses.map(res => res.id);

        const editResponseDto = plainToInstance(EditResponseDto, {
            orderId: id,
            end: new Date().toISOString(),
            status: EResponseStatus.DONE
        })

        await this.responseRepository.editMultipleResponses(editResponseDto, responsesId)

        const editOrderDto = plainToInstance(EditOrderDto, {
            id,
            status: EOrderStatus.REQUIRES_PAYMENT
        });

        const errors = await validate(editOrderDto);
        if (errors.length) throw errors;
        return {
            success: await this.orderRepository.editOrder(editOrderDto),
            end: editResponseDto.end
        }
    }

    closeOrder = async ({ id }: CloseOrderDto): Promise<boolean> => {
        const editOrderDto = plainToInstance(EditOrderDto, {
            id,
            status: EOrderStatus.DONE
        });
        const errors = await validate(editOrderDto);
        if (errors.length) throw errors;
        return await this.orderRepository.editOrder(editOrderDto);
    }

    cancelOrder = async ({ id }: CancelOrderDto): Promise<boolean> => {
        const editOrderDto = plainToInstance(EditOrderDto, {
            id,
            status: EOrderStatus.CANCELED
        });
        const errors = await validate(editOrderDto);
        if (errors.length) throw errors;
        return await this.orderRepository.editOrder(editOrderDto);
    }
}
