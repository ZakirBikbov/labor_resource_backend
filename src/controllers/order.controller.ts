import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { OrderService } from '@/services/order.service';
import { OrderDto } from '@/dto/order.dto';
import { ERole } from '@/enum/ERole.enum';
import { UserService } from '@/services/user.service';
import { getOrderParams } from '@/dto/getOrderParams.dto';
import { EOrderStatus } from '@/enum/EOrderStatus.enum';
import { OrderRepository } from '@/repositories/order.repository';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import { RegisterUserByManager } from '@/dto/registerUserByManager.dto';
import * as fs from 'fs';
import * as fastcsv from 'fast-csv';
import path from 'path';
import { EditOrderDto } from '@/dto/editOrder.dto';
import { ResponseService } from '@/services/response.service';
import { ConfirmArrivalForAllDto } from '@/dto/confirmArrivalForAll.dto';
import { ConfirmCompletionForAllDto } from '@/dto/confirmCompletionForAll.dto';
import { CloseOrderDto } from '@/dto/closeOrder.dto';
import { CancelOrderDto } from '@/dto/cancelOrder.dto';
import { StartOrderDto } from '@/dto/startOrder.dto';
import { EndOrderDto } from '@/dto/endOrder.dto';

export class OrderController {
    private service: OrderService;

    constructor() {
        this.service = new OrderService();
    }

    getOrder: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const order = await this.service.getOrderById(parseInt(req.params.id));
            if (order) {
                res.send(order);
            } else {
                res.status(400).send({
                    success: false,
                    message: 'order not found'
                });
            }
        } catch (e: any) {
            next(e);
        }
    }

    getOrders: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const { service, manager, customer, performer, status, sortBy } = req.query;
            const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
            const sortOrder = req.query.sortOrder ? req.query.sortOrder as 'ASC' | 'DESC' : 'ASC';
            const plainData = {
                service: service ? parseInt(service as string) : null,
                manager: manager ? parseInt(manager as string) : null,
                customer: customer ? parseInt(customer as string) : null,
                performer: performer ? parseInt(performer as string) : null,
                status: status ? status as EOrderStatus : null,
                sortBy
            };
            const paramsDto = plainToInstance(getOrderParams, plainData);
            const errors = await validate(paramsDto);
            if (errors.length) throw errors;
            const result = await this.service.getOrders({ ...paramsDto, offset, limit, sortOrder });
            res.send(result);
        } catch (e: any) {
            next(e);
        }
    }

    getOrderCSV: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const orderRepository = new OrderRepository();
            const orders = await orderRepository.getOrdersCSV();

            const formattedDateTime = getCurrentDate();

            const csvFileName = `orders_${formattedDateTime}.csv`;
            const csvFilePath = path.join(__dirname, '../..', 'csv', csvFileName);

            const ws = fs.createWriteStream(csvFilePath);
            const csvStream = fastcsv.format({ headers: true });
            csvStream.pipe(ws);

            orders.forEach(order => {
                csvStream.write({
                    'ID': order.id,
                    'Дата создания': getCurrentDate(order.createdAt),
                    'Заказчик': order.customer.displayName,
                    'Телефон заказчика': `8${order.customer.phone}`,
                    'Услуга': order.service.name,
                    'Дата исполнения': getCurrentDate(order.orderData),
                    'Адрес': order.address,
                    'Описание': order.description,
                    'Кол-во грузчиков': order.performersQuantity,
                    'Откликнувшиеся грузчики': !order.responses ? '' : order.responses.reduce((acc, response) =>
                        `${acc}${response.performer.displayName} (8${response.performer.phone}),\n`,
                        ''
                    ),
                    'Время работы': order.timeWorked,
                    'Поступления': order.income,
                    'Оплата грузчикам': order.performerPayment,
                    'Налоги': order.tax,
                    'Профит': order.profit,
                    'Широта': order.lat,
                    'Долгота': order.lng,
                    'Менеджер': order.manager.displayName,
                    'Телефон менеджера': `8${order.manager.phone}`,
                    'Комментарий менеджера': order.managerCommentary,
                    'Статус': order.status
                });
            });

            csvStream.end();
            ws.on('finish', () => {
                console.log('CSV файл успешно создан.');
                res.download(csvFilePath, csvFileName, (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        fs.unlinkSync(csvFilePath);
                    }
                });
            });

            ws.on('error', (error) => {
                console.error(error);
            });

        } catch (e: any) {
            next(e);
        }
    }

    createOrder: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const orderDto = plainToInstance(OrderDto, req.body);
            if (req.app.locals.user.role === ERole.manager || req.app.locals.user.role === ERole.admin) {
                // Если заказ создает менеджер
                if (!orderDto.managerId) {
                    orderDto.managerId = req.app.locals.user.id;
                }
                if (!orderDto.customerId) {
                    if (!orderDto.displayName || !orderDto.phone) {
                        res.status(400).send({
                            success: false,
                            message: 'No client was selected'
                        });
                    }
                    // Проверяем наличие пользователя в БД по номеру телефона и роли клиента
                    const userService = new UserService();
                    const user = await userService.getUserByPhoneAndRole(orderDto.phone, ERole.customer);
                    // Если пользователь не найден
                    if (!user) {
                        // Создаем клиента
                        const registerUserByManager = plainToInstance(RegisterUserByManager, req.body);
                        registerUserByManager.role = ERole.customer;
                        const createdCustomer = await userService.addUser(registerUserByManager);
                        orderDto.customerId = createdCustomer.id;
                    } else {
                        orderDto.customerId = user.id;
                    }
                }
            } else {
                // Если заказ создает клиент
                orderDto.customerId = req.app.locals.user.id;
                orderDto.managerId = 1;
            }
            const errors = await validate(orderDto);
            if (errors.length) throw errors;
            const createdOrder = await this.service.createOrder(orderDto);
            if (createdOrder) {
                res.send(createdOrder);
            } else {
                res.status(400).send({
                    success: false,
                    message: 'order wasn\'t created'
                });
            }
        } catch (e: any) {
            next(e);
        }
    }

    editOrder: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const editOrderDto = plainToInstance(EditOrderDto, req.body);
            editOrderDto.id = parseInt(req.params.id);
            const errors = await validate(editOrderDto);
            if (errors.length) throw errors;
            const editedOrder = await this.service.editOrder(editOrderDto);
            if (editedOrder) {
                res.send({
                    success: true,
                    message: 'order successfully updated'
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: 'order wasn\'t updated'
                });
            }
        } catch (e: any) {
            next(e);
        }
    }

    startOrder: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const startOrderDto = plainToInstance(StartOrderDto, { id: parseInt(req.params.id) });
            const errors = await validate(startOrderDto);
            if (errors.length) throw errors;
            const { success, start } = await this.service.startOrder(startOrderDto);
            res.send({
                success,
                start,
                message: 'The order is start. Arrivals confirmed, the start of work has been recorded.'
            });
        } catch (e: any) {
            next(e);
        }
    }

    endOrder: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const endOrderDto = plainToInstance(EndOrderDto, { id: parseInt(req.params.id) });
            const errors = await validate(endOrderDto);
            if (errors.length) throw errors;
            const { success, end } = await this.service.endOrder(endOrderDto);
            res.send({
                success,
                end,
                message: 'The order is end. Completions confirmed, the end of work has been recorded.'
            });
        } catch (e: any) {
            next(e);
        }
    }

    confirmArrivalForAll: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const confirmArrivalDto = plainToInstance(ConfirmArrivalForAllDto, { orderId: parseInt(req.params.id) });
            const errors = await validate(confirmArrivalDto);
            if (errors.length) throw errors;
            const responseService = new ResponseService();
            const { success, start } = await responseService.confirmArrivalForAll(confirmArrivalDto);
            res.send({
                success,
                start,
                message: `Arrivals confirmed${start ? ', the start of work has been recorded' : ''}.`
            });
        } catch (e: any) {
            next(e);
        }
    }

    confirmCompletionForAll: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const confirmArrivalDto = plainToInstance(ConfirmCompletionForAllDto, { orderId: parseInt(req.params.id) });
            const errors = await validate(confirmArrivalDto);
            if (errors.length) throw errors;
            const responseService = new ResponseService();
            const { success, end } = await responseService.confirmCompletionForAll(confirmArrivalDto);
            const editOrderDto = plainToInstance(EditOrderDto, {
                id: confirmArrivalDto.orderId,
                status: EOrderStatus.REQUIRES_PAYMENT
            });
            await this.service.editOrder(editOrderDto);
            res.send({
                success,
                end,
                message: 'Completions confirmed, the end of work has been recorded.'
            });
        } catch (e: any) {
            next(e);
        }
    }

    closeOrder: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const closeOrderDto = plainToInstance(CloseOrderDto, { id: parseInt(req.params.id) });
            const errors = await validate(closeOrderDto);
            if (errors.length) throw errors;
            const success = await this.service.closeOrder(closeOrderDto);
            res.send({
                success,
                message: 'The order is closed.'
            });
        } catch (e: any) {
            next(e);
        }
    }

    cancelOrder: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const cancelOrderDto = plainToInstance(CancelOrderDto, { id: parseInt(req.params.id) });
            const errors = await validate(cancelOrderDto);
            if (errors.length) throw errors;
            const success = await this.service.cancelOrder(cancelOrderDto);
            res.send({
                success,
                message: 'The order is canceled.'
            });
        } catch (e: any) {
            next(e);
        }
    }
}
