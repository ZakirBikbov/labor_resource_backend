import { ResponseDto } from '@/dto/response.dto';
import { ArrivalNotificationDto } from '@/dto/arrivalNotification.dto';
import { CompletionNotificationDto } from '@/dto/completionNotification.dto';
import { ResponseRepository } from '@/repositories/response.repository';
import { IResponse } from '@/interfaces/IResponse.interface';
import { EResponseStatus } from '@/enum/EResponseStatus.enum';
import { validate } from 'class-validator';
import { OrderRepository } from '@/repositories/order.repository';
import { EOrderStatus } from '@/enum/EOrderStatus.enum';
import { plainToInstance } from 'class-transformer';
import { EditOrderDto } from '@/dto/editOrder.dto';
import { EditResponseDto } from '@/dto/editResponse.dto';
import { ConfirmArrivalDto } from '@/dto/confirmArrival.dto';
import { ConfirmArrivalForAllDto } from '@/dto/confirmArrivalForAll.dto';
import { ConfirmCompletionForAllDto } from '@/dto/confirmCompletionForAll.dto';
import { ConfirmCompletionDto } from '@/dto/confirmCompletion.dto';
import { DeleteResponseDto } from '@/dto/deleteResponse.dto';
import { BlockPerformerDto } from '@/dto/blockPerformer.dto';
import { In, IsNull, Not } from 'typeorm';
import { ClosedResponseDto } from '@/dto/closedResponse.dto';
import { UnblockPerformerDto } from '@/dto/unblockPerformer.dto';

export class ResponseService {
    private responseRepository: ResponseRepository;
    private orderRepository: OrderRepository;

    constructor() {
        this.responseRepository = new ResponseRepository();
        this.orderRepository = new OrderRepository();
    }

    createResponse = async (responseDto: ResponseDto): Promise<IResponse> => {
        const { orderId } = responseDto;
        const response = await this.responseRepository.createResponse(responseDto);
        const order = await this.orderRepository.getOrderById(orderId);
        const responses = await this.responseRepository.count({ where: { orderId, status: Not(EResponseStatus.BANNED) } });
        if (order && order.performersQuantity === responses) {
            const editOrderDTO = plainToInstance(EditOrderDto, { id: orderId, status: EOrderStatus.WAITING })
            await this.orderRepository.editOrder(editOrderDTO);
        }
        return response;
    }

    checkWaitOrSearchOrderStatus = async (id: number, isDeleteResponse: boolean = false) => {
        let status = undefined;
        const order = await this.orderRepository.createQueryBuilder('order')
            .where(qb => {
                const subQuery = qb.subQuery()
                    .select('response.orderId')
                    .from('response', 'response')
                    .where('response.id = :id', { id })
                    .getQuery();

                return 'order.id IN ' + subQuery;
            })
            .leftJoinAndSelect('order.responses', 'response')
            .getOne();
        if (order) {
            let notBannedResponsesCount = order.responses.reduce((acc, res) => {
                return acc + (res.status !== EResponseStatus.BANNED ? 1 : 0);
            }, 0);
            if (isDeleteResponse) { notBannedResponsesCount-- };

            if (order.status === EOrderStatus.WAITING && order.performersQuantity > notBannedResponsesCount) {
                status = EOrderStatus.SEARCHING;
            } else if (order.status === EOrderStatus.SEARCHING && order.performersQuantity === notBannedResponsesCount) {
                status = EOrderStatus.WAITING;
            }

            if (status) {
                const editOrderDTO = plainToInstance(EditOrderDto, { id: order.id, status });
                await this.orderRepository.editOrder(editOrderDTO);
            }
        }
    }

    deleteResponse = async ({ id }: DeleteResponseDto): Promise<boolean> => {
        await this.checkWaitOrSearchOrderStatus(id, true);
        const result = await this.responseRepository.deleteResponse(id);
        return result;
    }

    blockPerformer = async ({ id }: BlockPerformerDto): Promise<boolean> => {
        let end: string | undefined = undefined;
        const status = EResponseStatus.BANNED;

        const response = await this.responseRepository.findOne({ where: { id } });
        if (response && response.status === EResponseStatus.IN_PROGRESS) {
            end = new Date().toISOString();
        }

        const editResponseDto = plainToInstance(EditResponseDto, { id, end, status });
        const errors = await validate(editResponseDto);
        if (errors.length) throw errors;

        const result = await this.responseRepository.editResponse(editResponseDto);

        await this.checkWaitOrSearchOrderStatus(id);

        return result;
    }


    unblockPerformer = async ({ id }: UnblockPerformerDto): Promise<boolean> => {
        const status = EResponseStatus.WAITING;

        const editResponseDto = plainToInstance(EditResponseDto, { id, status });
        const errors = await validate(editResponseDto);
        if (errors.length) throw errors;

        const result = await this.responseRepository.editResponse(editResponseDto);

        await this.checkWaitOrSearchOrderStatus(id);

        return result;
    }

    notifyArrival = async (arrivalDto: ArrivalNotificationDto): Promise<boolean> => {
        const editResponseDto = plainToInstance(EditResponseDto, {
            id: arrivalDto.id,
            status: EResponseStatus.AWAITING_CONFIRMATION_ARRIVAL
        })
        const errors = await validate(editResponseDto);
        if (errors.length) throw errors;
        return await this.responseRepository.editResponse(editResponseDto);
    }

    confirmArrival = async ({ id }: ConfirmArrivalDto): Promise<{ success: boolean, start?: string }> => {
        let start: string | undefined = new Date().toISOString();
        const status = EResponseStatus.IN_PROGRESS;
        let responsesId: number[] = [];

        const order = await this.orderRepository.getOrderByResponseId(id);

        if (order) {
            responsesId = await Promise.all(order.responses
                .filter(response =>
                    response.id !== id &&
                    response.status !== EResponseStatus.BANNED &&
                    response.start === null)
                .map(async (response) => {
                    const completionDto = plainToInstance(CompletionNotificationDto, response);
                    const errors = await validate(completionDto);
                    if (errors.length) {
                        start = undefined;
                    }
                    return response.id;
                }));
            responsesId.push(id);
        }

        const editResponseDto = plainToInstance(EditResponseDto, { id, start, status })
        const errors = await validate(editResponseDto);
        if (errors.length) throw errors;

        if (start && order) {
            const editOrderDto = plainToInstance(EditOrderDto, {
                id: order.id,
                status: EOrderStatus.IN_PROGRESS
            });
            await this.orderRepository.editOrder(editOrderDto);
        }
        return {
            success: start
                ? await this.responseRepository.editMultipleResponses(editResponseDto, responsesId)
                : await this.responseRepository.editResponse(editResponseDto),
            start
        }
    }

    confirmArrivalForAll = async ({ orderId }: ConfirmArrivalForAllDto): Promise<{ success: boolean, start: string }> => {
        let start: string | undefined = undefined;
        const status = EResponseStatus.IN_PROGRESS;

        const responses = await this.responseRepository.find({
            where: {
                orderId,
                status: In([
                    EResponseStatus.AWAITING_CONFIRMATION_ARRIVAL,
                    EResponseStatus.IN_PROGRESS
                ]),
                start: IsNull()
            }
        });
        const responsesId = responses.map(res => res.id);

        const order = await this.orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.responses', 'response', 'response.status != :status', { status: EResponseStatus.BANNED })
            .where('order.id = :id', { id: orderId })
            .getOne();

        if (order && responses.length === order.responses.length) {
            start = new Date().toISOString();
            const editOrderDto = plainToInstance(EditOrderDto, {
                id: orderId,
                status: EOrderStatus.IN_PROGRESS
            });
            await this.orderRepository.editOrder(editOrderDto);
        }

        const editResponseDto = plainToInstance(EditResponseDto, { orderId, start, status })
        const errors = await validate(editResponseDto);
        if (errors.length) throw errors;

        return {
            success: await this.responseRepository.editMultipleResponses(editResponseDto, responsesId),
            start: editResponseDto.start
        }
    }

    notifyCompletion = async (completionDto: CompletionNotificationDto): Promise<boolean> => {
        const editResponseDto = plainToInstance(EditResponseDto, {
            id: completionDto.id,
            status: EResponseStatus.AWAITING_CONFIRMATION_COMPLETION
        })
        const errors = await validate(editResponseDto);
        if (errors.length) throw errors;
        return await this.responseRepository.editResponse(editResponseDto);
    }

    confirmCompletion = async ({ id }: ConfirmCompletionDto): Promise<{ success: boolean, end: string }> => {
        let end: string | undefined = new Date().toISOString();
        const status = EResponseStatus.DONE;
        let responsesId: number[] = [];

        const order = await this.orderRepository.getOrderByResponseId(id);

        if (order) {
            responsesId = await Promise.all(order.responses
                .filter(response =>
                    response.id !== id &&
                    response.status !== EResponseStatus.BANNED &&
                    response.end === null)
                .map(async (response) => {
                    const closedResponseDto = plainToInstance(ClosedResponseDto, response);
                    const errors = await validate(closedResponseDto);
                    if (errors.length) {
                        end = undefined;
                    }
                    return response.id;
                }));
            responsesId.push(id);
        }

        const editResponseDto = plainToInstance(EditResponseDto, { id, end, status })
        const errors = await validate(editResponseDto);
        if (errors.length) throw errors;

        if (end && order) {
            const editOrderDto = plainToInstance(EditOrderDto, {
                id: order.id,
                status: EOrderStatus.REQUIRES_PAYMENT
            });
            await this.orderRepository.editOrder(editOrderDto);
        }
        return {
            success: end
                ? await this.responseRepository.editMultipleResponses(editResponseDto, responsesId)
                : await this.responseRepository.editResponse(editResponseDto),
            end
        }
    }

    confirmCompletionForAll = async ({ orderId }: ConfirmCompletionForAllDto): Promise<{ success: boolean, end: string }> => {
        let end: string | undefined = undefined;
        const status = EResponseStatus.DONE;

        const responses = await this.responseRepository.find({
            where: {
                orderId,
                status: In([
                    EResponseStatus.AWAITING_CONFIRMATION_COMPLETION,
                    EResponseStatus.DONE
                ]),
                end: IsNull()
            }
        });
        const responsesId = responses.map(res => res.id);

        const order = await this.orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.responses', 'response', 'response.status != :status', { status: EResponseStatus.BANNED })
            .where('order.id = :id', { id: orderId })
            .getOne();

        if (order && responses.length === order.responses.length) {
            end = new Date().toISOString();
            const editOrderDto = plainToInstance(EditOrderDto, {
                id: orderId,
                status: EOrderStatus.REQUIRES_PAYMENT
            });
            await this.orderRepository.editOrder(editOrderDto);
        }

        const editResponseDto = plainToInstance(EditResponseDto, { orderId, end, status })
        const errors = await validate(editResponseDto);
        if (errors.length) throw errors;

        return {
            success: await this.responseRepository.editMultipleResponses(editResponseDto, responsesId),
            end: editResponseDto.end
        }
    }
}